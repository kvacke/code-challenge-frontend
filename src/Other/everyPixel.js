const EveryPixel = require("everypixel");

const api = new EveryPixel({
  username: process.env.REACT_APP_EVERYPIXEL_API_CLIENTKEY,
  password: process.env.REACT_APP_EVERYPIXEL_API_SECRETKEY,
});

/*

The free plan for Everypixels API includes 100 calls per day,
so if the call throws an error the mock call will run instead.

*/

export async function everyPixelQualityCall(imgURL) {
  var result;
  try {
    result = await api.quality_ugc({ url: imgURL });
    console.log("Everypixel returned a quality rating.");
  } catch (error) {
    console.log(
      "Everypixel API threw error: \n" + error + ".\nReturning mock call."
    );
    result = await everyPixelMockCall();
  }

  var score = Math.floor(result.data.quality.score * 100);
  return score;
}

/*
This mock call will wait between 1-6s and return an identical result but with a random value
floored at 50% to not clutter the image feed with 75% 'Bad stock photo'.
*/
export async function everyPixelMockCall() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(getfakeEveryPixelAnswer()),
      getRandomInt(1000, 4000)
    );
  });
  let result = await promise;
  return result;
}

function getfakeEveryPixelAnswer() {
  return {
    data: {
      quality: {
        score: getRandomInt(50, 100) / 100,
      },
      status: "ok",
    },
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
