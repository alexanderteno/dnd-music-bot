import { RequestHandler, Request, Response } from 'express';
import TagModel from '../web/models/TagModel';
import TagsRepository from '../services/Repositories/TagsRepository';

export default class TagsController {

    static tagsPost: RequestHandler = async (request: Request, response: Response) => {
        const songId = parseInt(request.params.songId);
        try {
            const tags = await TagsRepository.insertTag(songId, request.body.tag);
            response.json(tags);
        } catch (err) {
            response.status(500).json(err);
        }
    }

    static tagsGet: RequestHandler = async (request: Request, response: Response) => {
        const songId = parseInt(request.params.songId);
        const asyncTags: Promise<TagModel[]> = songId ? TagsRepository.getTagsBySongId(songId) : TagsRepository.getTags();
        try {
            const tags = await asyncTags;
            response.json(tags);
        } catch (err) {
            throw err;
        }
    }

}