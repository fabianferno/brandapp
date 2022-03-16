const { MongoClient } = require('mongodb');
const mongo = new MongoClient(process.env.MONGO_DB_URI);

var ObjectId = require('mongodb').ObjectId;

async function createProject(project) {
  try {
    await mongo.connect();
    var projectOwner = await mongo
      .db()
      .collection('users')
      .findOne(
        {
          email: {
            $eq: project.createdBy // Check if the email is the same
          }
        },
        {
          sort: { email: 1 } // Sort by email ascending
        }
      );
    var project = {
      ...project,
      ...{
        createdBy: new ObjectId(projectOwner._id),
        collabs: project.collabs.map(user => ({ ...user, _id: new ObjectId(user._id) })),
        admins: project.admins.map(user => ({ ...user, _id: new ObjectId(user._id) }))
      }
    };
    const result = await mongo.db().collection('projects').insertOne(project);
    // console.log(result);
    return result;
  } catch (e) {
    throw e;
  } finally {
    await mongo.close();
  }
}

async function updateProject(project) {
  try {
    await mongo.connect();
    const result = await mongo
      .db()
      .collection('projects')
      .updateOne({ _id: project._id }, { $set: project }, { upsert: true });
    return result;
  } catch (e) {
    throw e;
  } finally {
    await mongo.close();
  }
}

async function getProject(_id) {
  try {
    await mongo.connect();
    return await mongo
      .db()
      .collection('projects')
      .findOne({
        _id: new ObjectId(_id)
      });
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
      await createProject(req.body)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    case 'PUT':
      await updateProject(req.body.project)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    case 'GET':
      await getProject(req.query._id)
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
