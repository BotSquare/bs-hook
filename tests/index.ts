
import { NotionModel } from '../src/models/external/notion.model';

const main = (async () => {
    const notion = new NotionModel();
    await notion.createPage();

})();