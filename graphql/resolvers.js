// import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
// import { loadFilesSync } from "@graphql-tools/load-files";
import userResolver from "./resolvers/user.js";
import movieResolver from "./resolvers/movie.js";
import tvserieResolver from "./resolvers/tvserie.js";

// const __dirname = path.resolve();
// const resolversArray = loadFilesSync(path.join(__dirname, './graphql/resolvers'), { extensions: ['js']});

export default mergeResolvers([userResolver, movieResolver, tvserieResolver]);