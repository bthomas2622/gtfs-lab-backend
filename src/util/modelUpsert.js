const modelUpsert = ((MongoModel, input, fileName) => new Promise((async (resolve, reject) => {
  try {
    const mongoDocument = new MongoModel(input);
    const upsertMongoDocument = mongoDocument.toObject();
    const documentExists = await MongoModel.find((err, docs) => {
    //   console.log('finding docs');
      if (err) return console.error(err);
      //   console.log(docs.length);
      if (docs.length === 0 || docs === undefined) {
        // console.log('false');
        return false;
      }
      //   console.log('true');
      return true;
    });
    if (documentExists) {
    //   console.log('in document exists');
      delete upsertMongoDocument._id;
      delete upsertMongoDocument.created;
      //   console.log('past deletes onto update');
      await MongoModel.update(
        { agency_key: input.agency_key },
        upsertMongoDocument,
        { upsert: true },
        ((err) => { if (err) console.error(err); }),
      );
    } else {
    //   console.log('doc save');
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
