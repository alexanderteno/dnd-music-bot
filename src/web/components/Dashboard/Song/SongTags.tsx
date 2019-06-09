import React, { Component } from 'react';
import TagModel, { isTagModel } from '../../../models/TagModel';
import Loading from '../../General/Loading';
import AutoSuggest from '../../General/AutoSuggest';
import TagService from '../../../../services/WebApi/TagService';
import SongsService from '../../../../services/WebApi/SongsService';
import { cloneDeep } from 'lodash';
import './SongTags.scss';
import SongTagModel from '../../../models/SongTagModel';

interface SongTagsProps {
    songId: number;
    handleDeleteTag: (songTag: SongTagModel, callback?: (...args: any[]) => void) => void;
}
interface SongTagsState { songTags: SongTagModel[] | undefined }

export default class SongTags extends Component<SongTagsProps, SongTagsState> {

    constructor(props: SongTagsProps) {
        super(props);
        this.state = {
            songTags: undefined,
        }
    }

    componentDidMount() {
        SongsService.getSongTagsBySongId(this.props.songId)
            .then((songTags: SongTagModel[]) => {
                this.setState({ songTags: songTags });
            });
    }

    getTags = (): Promise<TagModel[]> => {
        return TagService.getTags();
    }

    hasTag = (tag: TagModel): boolean => {
        return this.state.songTags.some((stateTag: TagModel) => stateTag.tagId === tag.tagId);
    }

    handleSelect = async (selectedTag: TagModel | string) => {
        const hasTag = isTagModel(selectedTag) && this.hasTag(selectedTag);
        if (!hasTag) {
            const newTag = await SongsService.addSongTag(this.props.songId, selectedTag);
            this.setState((prevState) => {
                const tags = cloneDeep(prevState.songTags);
                tags.push(newTag);
                return { songTags: tags };
            })
        }
    }

    handleDeleteSongTag = (songTag: SongTagModel) => {
        this.props.handleDeleteTag(
            songTag,
            (returnId: number) => {
                this.setState((prevState) => {
                    return {
                        songTags: prevState.songTags.filter((st) => st.songTagId !== returnId),
                    };
                })
            },
        )
    }

    render() {
        const { songTags } = this.state;
        return (
            <>
                <label className="input-label">Tags:</label>
                {
                    (songTags !== undefined) ? (
                        <div className="input-control tags">
                            {
                                songTags.map((songTag: SongTagModel) => (
                                    <div key={songTag.tagId} className="tag">
                                        <span className="tag-content">
                                            {songTag.label}
                                        </span>
                                        <button
                                            className="remove-tag material-icons"
                                            onClick={() => this.handleDeleteSongTag(songTag)}
                                        >
                                            close
                                        </button>
                                    </div>
                                ))
                            }
                            <AutoSuggest<TagModel>
                                getLabel={(suggestion: TagModel) => suggestion.label}
                                fetchSuggestions={this.getTags}
                                onSelect={this.handleSelect}
                                placeholder="Tag..."
                            />
                        </div>
                    ) : <Loading />
                }
            </>
        )
    }

}