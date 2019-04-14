import { RequestHandler, Request, Response } from 'express';
import TagModel from '../web/models/TagModel';
import TagsRepository from '../services/Repositories/TagsRepository';

export default class TagsController {

    static tagsGet: RequestHandler = (request: Request, response: Response) => {

        const songId = parseInt(request.params.songId);

        if (songId) {
            TagsRepository.getTagsBySongId(songId);
        }

        const getTagsPromise = songId ? TagsRepository.getTagsBySongId(songId) : TagsRepository.getTags();

        getTagsPromise
            .then((tags: TagModel[]) => {
                response.json(tags);
            })
            .catch((err) => {
                response.status(500).json(err);
            });

    }

}