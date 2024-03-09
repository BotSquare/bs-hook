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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const notion_model_1 = require("./models/external/notion.model");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
const page_id = "80d7950e-1de9-4262-85a0-44428f866bf8";
const insertBlockToPage = (text, author) => __awaiter(void 0, void 0, void 0, function* () {
    const notion = new notion_model_1.NotionModel();
    const response = yield notion.insertBlockToPage(text, page_id, author);
});
app.get('/form', (req, res) => {
    res.render('form');
});
app.post('/notion/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { input } = body;
    // const { url } = body;
    console.log(body);
    const apiUrl = 'https://ai.arclightsoftware.com/api/v1/api-hook/message';
    const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6MTYwLCJjaGFubmVsSWQiOjI4NCwiY3JlYXRlZEF0IjoiMjAyMy0wOC0xMFQwNzowNDozMC42MjRaIiwiaG9va1VybCI6Imh0dHBzOi8vMTQzNS00Ny0xNTQtOTktMjIubmdyb2suaW8vbm90aW9uL2hvb2siLCJpYXQiOjE2OTE2NTEwNzB9.6DeG_ESArzHrS0RSYMbBx00RqNxGHPximBtBKFrl-6M';
    const headers = {
        Authorization: 'Bearer ' + bearerToken,
    };
    const bodyData = {
        input: {
            value: input.value,
            type: 'text',
        },
        options: {
        // This object will be returned in webhook request.
        },
    };
    yield insertBlockToPage(input.value, 'Me');
    yield axios_1.default.post(apiUrl, bodyData, { headers });
    // res.status(200).send('OK');
    res.redirect('/form');
}));
app.post('/notion/hook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { input } = body;
    // const { url } = body;
    yield insertBlockToPage(input.value, "Bot");
    res.status(200).send('OK');
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
