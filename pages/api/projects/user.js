const { MongoClient } = require('mongodb');
const mongo = new MongoClient(process.env.MONGO_DB_URI);

var ObjectId = require('mongodb').ObjectId;

async function getProject(_id) {
  try {
    await mongo.connect();
    const owned = await mongo
      .db()
      .collection('projects')
      .find(
        {
          $or: [
            {
              createdBy: new ObjectId(_id)
            },
            {
              admins: {
                $elemMatch: {
                  _id: new ObjectId(_id)
                }
              }
            }
          ]
        },
        { sort: { _id: -1 } }
      )
      .toArray();

    const assigned = await mongo
      .db()
      .collection('projects')
      .find(
        {
          collabs: {
            $elemMatch: {
              _id: new ObjectId(_id)
            }
          }
        },
        { sort: { _id: -1 } }
      )
      .toArray();

    return { owned: owned, assigned: assigned };
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
    case 'POST':
      await getProject(req.body._id) // Get User _id from query
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
