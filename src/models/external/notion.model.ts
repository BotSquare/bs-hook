
const token = "secret_7Y1uOxGJyxGEzWeUlO2xOlk0pHhobcHRgNGlTYhUJsQ";
import { Client } from '@notionhq/client';
const notion = new Client({ auth: token });

export class NotionModel {
    constructor() { }

    public async createPage() {
        const response = await notion.pages.create({
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
    }


    public async insertBlockToPage(text: string, page_id: string, author: string = "Me") {
        const response = await notion.blocks.children.append({
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
    }
}