const mm = require('music-metadata');

(async () => {
  try {
    const metadata = await mm.parseStream(someReadStream, {
      mimeType: 'audio/mpeg',
      size: 26838,
    });
    console.log(metadata);
  } catch (error) {
    console.error(error.message);
  }
})();
