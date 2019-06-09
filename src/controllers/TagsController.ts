import { RequestHandler, Request, Response } from 'express';
import TagModel from '../web/models/TagModel';
import TagsRepository from '../services/Repositories/TagsRepository';
import { Result } from 'range-parser';

export default class TagsController {

    static playlistsGet: RequestHandler = async (_: Request, response: Response) => {
        try {
            const playlists = await TagsRepository.getPlaylists();
            response.json(playlists);
        } catch (err) {
            response.status(500).json(err);
        }
    }

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

    static songTagDelete: RequestHandler = async (request: Request, response: Response) => {
        try {
            const songTagId = parseInt(request.params.songTagId);
            const returnId = await TagsRepository.deleteSongTagBySongTagId(songTagId);
            response.json(returnId);
        } catch (err) {
            response
                .status(500)
                .json(err);
        }
    }

}