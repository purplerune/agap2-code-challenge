const axios = require("axios");
const { fetchSingleEpisode } = require("./episodeAPI");

jest.mock("axios");

test("mock axios get function", async () => {
  expect.assertions(1);
  const episode = {
    id: 657309,
    url: "https://www.tvmaze.com/episodes/657309/the-powerpuff-girls-1x02-princess-buttercup",
    name: "Princess Buttercup",
    season: 1,
    number: 2,
    type: "regular",
    airdate: "2016-04-04",
    airtime: "18:00",
    airstamp: "2016-04-04T22:00:00+00:00",
    runtime: 15,
    rating: {
      average: null,
    },
    image: {
      medium:
        "https://static.tvmaze.com/uploads/images/medium_landscape/53/132618.jpg",
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/53/132618.jpg",
    },
    summary:
      "<p>Buttercup becomes enamored with a team of roller derby girls called the Derbytantes. When she starts spending all of her time with them, Princess Morbucks seeks to be her replacement in the Powerpuff Girls.</p>",
    _links: {
      self: {
        href: "https://api.tvmaze.com/episodes/657309",
      },
      show: {
        href: "https://api.tvmaze.com/shows/6771",
        name: "The Powerpuff Girls",
      },
    },
  };
  const payload = { data: episode };
  axios.get = jest.fn().mockResolvedValue(payload);
  await expect(fetchSingleEpisode(657309)).resolves.toEqual(episode);
});
