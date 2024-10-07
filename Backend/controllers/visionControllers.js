const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { ApiKeyCredentials } = require('@azure/ms-rest-js');
require('dotenv').config();

// Set up the Azure Computer Vision client
const client = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': process.env.VISION_KEY } }),
  process.env.VISION_ENDPOINT
);

exports.recognizeText = async (req, res) => {
  const { imageUrl } = req.body;
  
  try {
    let result;
    if (req.file) {
      result = await client.readInStream(req.file.buffer);
    } else if (imageUrl) {
      result = await client.read(imageUrl);
    } else {
      return res.status(400).json({ error: 'No image provided' });
    }

    const operation = result.operationLocation.split('/').slice(-1)[0];

    let readResult;
    while (!readResult || (readResult.status !== 'succeeded' && readResult.status !== 'failed')) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      readResult = await client.getReadResult(operation);
    }

    if (readResult.status === 'failed') {
      return res.status(500).json({ error: 'Failed to recognize text' });
    }

    const recognizedText = readResult.analyzeResult.readResults
      .map(page => page.lines.map(line => line.words.map(word => word.text).join(' ')).join('\n'))
      .join('\n');

    res.json({ text: recognizedText });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the image.' });
  }
};
