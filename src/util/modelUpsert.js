const modelUpsert = ((MongoModel, input, fileName) => new Promise((async (resolve, reject) => {
  try {
    const mongoDocument = new MongoModel(input);
    const upsertMongoDocument = mongoDocument.toObject();
    const finderDocument = upsertMongoDocument;
    delete finderDocument._id;
    delete finderDocument.created;
    if (Object.prototype.hasOwnProperty.call(finderDocument, 'last_updated')) {
      delete finderDocument.last_updated;
    }
    let documentExists;
    let docs;

    try {
      docs = await MongoModel.find(finderDocument);
    } catch (findError) {
      console.error(findError);
    }
    if (docs.length === 0 || docs === undefined) {
      documentExists = false;
    } else {
      documentExists = true;
    }
    if (documentExists) {
      delete upsertMongoDocument._id;
      delete upsertMongoDocument.created;
      await MongoModel.update(
        { agency_key: input.agency_key },
        upsertMongoDocument,
        { upsert: true },
        ((err) => { if (err) console.error(err); }),
      );
    } else {
      await mongoDocument.save((err) => {
        if (err) console.error(err);
      });
    }
    resolve(`done updating entry for ${fileName}`);
  } catch (error) {
    reject(error);
  }
})));

export default modelUpsert;
