import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { projectType } from "./projectType";
import { skillType } from "./skillType";
import { resumeType } from "./resumeType";
import { experienceType } from "./experienceType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		blockContentType,
		categoryType,
		postType,
		authorType,
		projectType,
		skillType,
		resumeType,
    experienceType,
	],
};
