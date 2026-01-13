import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const movies = [
  {
    Title: "Se7en",
    Description: "Two detectives hunt a serial killer who uses the seven deadly sins as motives.",
    Genre: {
      Name: "Thriller",
      Description: "Tense, suspense-driven stories focused on danger, mystery, and high stakes."
    },
    Director: {
      Name: "David Fincher",
      Bio: "American director known for dark psychological thrillers.",
      Birth: "1962",
      Death: null
    },
    ImagePath: "images/se7en.jpg",
    Featured: true,
    ReleaseYear: 1995,
    Rating: "R"
  },
  {
    Title: "Fight Club",
    Description: "An office worker forms an underground fight club that spirals out of control.",
    Genre: {
      Name: "Drama",
      Description: "Character-driven stories focused on emotional themes and personal conflict."
    },
    Director: {
      Name: "David Fincher",
      Bio: "American director known for dark psychological thrillers.",
      Birth: "1962",
      Death: null
    },
    ImagePath: "images/fightclub.jpg",
    Featured: false,
    ReleaseYear: 1999,
    Rating: "R"
  },
  {
    Title: "Zodiac",
    Description: "Investigators obsess over identifying the Zodiac Killer.",
    Genre: {
      Name: "Thriller",
      Description: "Tense, suspense-driven stories focused on danger, mystery, and high stakes."
    },
    Director: {
      Name: "David Fincher",
      Bio: "American director known for dark psychological thrillers.",
      Birth: "1962",
      Death: null
    },
    ImagePath: "images/zodiac.jpg",
    Featured: false,
    ReleaseYear: 2007,
    Rating: "R"
  },
  {
    Title: "The Dark Knight",
    Description: "Batman faces the Joker, who pushes Gotham into chaos.",
    Genre: {
      Name: "Action",
      Description: "Fast-paced stories featuring physical feats and conflict."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "British-American filmmaker known for ambitious blockbusters.",
      Birth: "1970",
      Death: null
    },
    ImagePath: "images/thedarkknight.jpg",
    Featured: true,
    ReleaseYear: 2008,
    Rating: "PG-13"
  },
  {
    Title: "Inception",
    Description: "A thief enters dreams to plant an idea inside the subconscious.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Speculative stories exploring technology and imagined futures."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "British-American filmmaker known for ambitious blockbusters.",
      Birth: "1970",
      Death: null
    },
    ImagePath: "images/inception.jpg",
    Featured: true,
    ReleaseYear: 2010,
    Rating: "PG-13"
  },
  {
    Title: "Interstellar",
    Description: "Explorers travel through a wormhole to save humanity.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Speculative stories exploring technology and imagined futures."
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "British-American filmmaker known for ambitious blockbusters.",
      Birth: "1970",
      Death: null
    },
    ImagePath: "images/interstellar.jpg",
    Featured: false,
    ReleaseYear: 2014,
    Rating: "PG-13"
  },
  {
    Title: "The Matrix",
    Description: "A hacker discovers reality is a simulation.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Speculative stories exploring technology and imagined futures."
    },
    Director: {
      Name: "Lana Wachowski",
      Bio: "American filmmaker known for visually bold sci-fi storytelling.",
      Birth: "1965",
      Death: null
    },
    ImagePath: "images/matrix.jpg",
    Featured: true,
    ReleaseYear: 1999,
    Rating: "R"
  },
  {
    Title: "John Wick",
    Description: "A retired hitman returns to the criminal underworld.",
    Genre: {
      Name: "Action",
      Description: "Fast-paced stories featuring physical feats and conflict."
    },
    Director: {
      Name: "Chad Stahelski",
      Bio: "American director and stunt coordinator.",
      Birth: "1968",
      Death: null
    },
    ImagePath: "images/johnwick.jpg",
    Featured: false,
    ReleaseYear: 2014,
    Rating: "R"
  },
  {
    Title: "Sicario",
    Description: "An FBI agent joins a task force targeting a Mexican cartel.",
    Genre: {
      Name: "Thriller",
      Description: "Tense, suspense-driven stories focused on danger and moral ambiguity."
    },
    Director: {
      Name: "Denis Villeneuve",
      Bio: "Canadian director known for atmospheric thrillers.",
      Birth: "1967",
      Death: null
    },
    ImagePath: "images/sicario.jpg",
    Featured: false,
    ReleaseYear: 2015,
    Rating: "R"
  },
  {
    Title: "Blade Runner 2049",
    Description: "A blade runner uncovers a secret that could destabilize society.",
    Genre: {
      Name: "Sci-Fi",
      Description: "Speculative stories exploring technology and imagined futures."
    },
    Director: {
      Name: "Denis Villeneuve",
      Bio: "Canadian director known for atmospheric thrillers.",
      Birth: "1967",
      Death: null
    },
    ImagePath: "images/bladerunner2049.jpg",
    Featured: true,
    ReleaseYear: 2017,
    Rating: "R"
  }
];

async function seedMovies() {
  try {
    await client.connect();
    const db = client.db("myflixDB");

    await db.collection("movies").deleteMany({});
    const result = await db.collection("movies").insertMany(movies);

    console.log(`✅ Inserted ${result.insertedCount} movies`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedMovies();
