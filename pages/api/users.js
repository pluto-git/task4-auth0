import { connectToDataBase } from "../../lib/db";
//import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  if (req.method == "GET") {
    ///checking session
    // const { user } = getSession(req, res);

    const client = await connectToDataBase();
    const usersCollection = client.db().collection("users");
    const user_ = await usersCollection.find().toArray();
    res.json(user_);
    client.close();
  } else if (req.method == "DELETE") {
    ///check the session

    const client = await connectToDataBase();
    const usersCollection = client.db().collection("users");
    const data = req.body;
    const { selectedUsers } = data;

    console.log(selectedUsers);
    for (let i in selectedUsers) {
      const deleteStatus = await usersCollection.deleteOne({
        email: selectedUsers[i],
      });
      if (!deleteStatus) {
        throw new Error(
          "Something went wrong on the DELETE request. Check users!"
        );
      } else {
        console.log(deleteStatus);
      }
    }

    res.status(201).json({ message: "Successfully deleted!" });
    client.close();
  } else if (req.method == "POST") {
    const data = req.body;
    const { username, email} = data;

    const client = await connectToDataBase();
    const usersCollection = client.db().collection("users");
    const existingUser = await usersCollection.findOne({ email: email });
  
    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    let registerDate = new Date().toLocaleDateString();
    const result = await usersCollection.insertOne({
      name: username,
      email: email,
      registerDate: registerDate,
      lastVisit: "never",
      status: "unblocked",
    });

    res.status(201).json({ message: "Created user!" });
  } else {
    return;
  }
}
