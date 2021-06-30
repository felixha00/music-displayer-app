const mm = require('music-metadata');

(async () => {
  try {
    const metadata = await mm.parseFile(
      '../assets/σ- for the DELTA (Akira Complex Remix).mp3'
    );
    const { common, format } = metadata;
    const songData = {
      common,
      format,
    };
  } catch (error) {
    console.error(error.message);
  }
})();
