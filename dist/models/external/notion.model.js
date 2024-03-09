"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionModel = void 0;
const token = "secret_7Y1uOxGJyxGEzWeUlO2xOlk0pHhobcHRgNGlTYhUJsQ";
const client_1 = require("@notionhq/client");
const notion = new client_1.Client({ auth: token });
class NotionModel {
    constructor() { }
    createPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield notion.pages.create({
                "cover": {
                    "type": "external",
                    "external": {
                        "url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
                    }
                },
                "icon": {
                    "type": "emoji",
                    "emoji": "🥬"
                },
                "parent": {
                    "type": "page_id",
                    "page_id": "359f7591-3f9a-4156-a5c7-f95096a1fd14"
                },
                "properties": {
                    "title": {
                        "title": [
                            {
                                "text": {
                                    "content": "Lacinato kale"
                                }
                            }
                        ]
                    }
                },
                "children": [
                    {
                        "object": "block",
                        "heading_2": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "Lacinato kale"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "object": "block",
                        "paragraph": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                                        "link": {
                                            "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
                                        }
                                    }
                                }
                            ],
                            "color": "default"
                        }
                    }
                ]
            });
            // console.log(response);
        });
    }
    insertBlockToPage(text, page_id, author = "Me") {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield notion.blocks.children.append({
                block_id: page_id,
                children: [
                    {
                        object: "block",
                        paragraph: {
                            rich_text: [
                                {
                                    type: "text",
                                    text: {
                                        content: ` - ${author}`,
                                    }
                                },
                            ],
                        },
                    },
                    {
                        object: "block",
                        paragraph: {
                            rich_text: [
                                {
                                    type: "text",
                                    text: {
                                        content: text,
                                    },
                                }
                            ],
                        },
                    },
                ],
            });
            // console.log(response);
        });
    }
}
exports.NotionModel = NotionModel;
