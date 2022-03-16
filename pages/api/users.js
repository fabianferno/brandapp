const { MongoClient } = require('mongodb');
const mongo = new MongoClient(process.env.MONGO_DB_URI);

async function upsertUser(user) {
  try {
    await mongo.connect();
    var updatedUser = {
      fullName: user.name,
      email: user.email,
      auth0: user.sub
    };
    const result = await mongo
      .db()
      .collection('users')
      .updateOne({ email: user.email }, { $set: updatedUser }, { upsert: true });

    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await mongo.close();
  }
}

async function getUser(email) {
  try {
    await mongo.connect();
    return await mongo
      .db()
      .collection('users')
      .findOne(
        {
          email: {
            $eq: email // Check if the email is the same
          }
        },
        {
          sort: { email: 1 } // Sort by email ascending
        }
      );
  } catch (e) {
    console.error(e);
  } finally {
    await mongo.close();
  }
}

export default async function handler(req, res) {
  // Get data from your database
  var result = {};

  switch (req.method) {
    case 'PUT':
      await upsertUser(req.body.user)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    case 'GET':
      await getUser(req.query.email)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    default:
      result = 'Invalid Method';
      res.status(301).json({ data: result });
  }
}
