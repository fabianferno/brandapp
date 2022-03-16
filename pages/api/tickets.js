const { MongoClient } = require('mongodb');
const mongo = new MongoClient(process.env.MONGO_DB_URI);

var ObjectId = require('mongodb').ObjectId;

async function createTicket(ticket) {
  try {
    await mongo.connect();
    var ticket = {
      ...ticket,
      ...{
        collabs: ticket.collabs.map(user => ({ ...user, _id: new ObjectId(user._id) })),
        admins: ticket.admins.map(user => ({ ...user, _id: new ObjectId(user._id) }))
      }
    };
    const result = await mongo.db().collection('tickets').insertOne(ticket);
    console.log(result);
    return result;
  } catch (e) {
    throw e;
  } finally {
    await mongo.close();
  }
}

async function updateticket(ticket) {
  try {
    await mongo.connect();
    const result = await mongo
      .db()
      .collection('tickets')
      .updateOne({ _id: ticket._id }, { $set: ticket }, { upsert: true });
    return result;
  } catch (e) {
    throw e;
  } finally {
    await mongo.close();
  }
}

async function getticket(_id) {
  try {
    await mongo.connect();
    await mongo
      .db()
      .collection('tickets')
      .findOne(
        {
          _id: {
            $eq: _id
          }
        },
        {
          sort: { name: 1 } // Sort by name ascending
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
    case 'POST':
      await createTicket(req.body)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    case 'PUT':
      await updateticket(req.body.ticket)
        .then(data => {
          res.status(200).json(data);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json(e);
        });
      break;
    case 'GET':
      await getticket(req.query._id)
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
