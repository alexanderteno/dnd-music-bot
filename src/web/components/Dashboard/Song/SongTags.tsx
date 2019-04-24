import React, { Component } from 'react';
import TagModel, { isTagModel } from '../../../models/TagModel';
import Loading from '../../General/Loading';
import AutoSuggest from '../../General/AutoSuggest';
import TagService from '../../../../services/WebApi/TagService';
import SongsService from '../../../../services/WebApi/SongsService';
import { cloneDeep } from 'lodash';
import './SongTags.scss';

interface SongTagsProps { songId: number }
interface SongTagsState { tags: TagModel[] | undefined }

export default class SongTags extends Component<SongTagsProps, SongTagsState> {

    constructor(props: SongTagsProps) {
        super(props);
        this.state = {
            tags: undefined,
        }
    }

    componentDidMount() {
        SongsService.getTagsBySongId(this.props.songId)
            .then((tags: TagModel[]) => {
                this.setState({ tags });
            });
    }

    getTags = (): Promise<TagModel[]> => {
        return TagService.getTags();
    }

    hasTag = (tag: TagModel): boolean => {
        return this.state.tags.some((stateTag: TagModel) => stateTag.tagId === tag.tagId);
    }

    handleSelect = async (selectedTag: TagModel | string) => {
        const hasTag = isTagModel(selectedTag) && this.hasTag(selectedTag);
        if (!hasTag) {
            const newTag = await SongsService.addTag(this.props.songId, selectedTag);
            this.setState((prevState) => {
                const tags = cloneDeep(prevState.tags);
                tags.push(newTag);
                return { tags };
            })
        }
    }

    render() {
        const { tags } = this.state;
        return (
            <>
                <label className="input-label">Tags:</label>
                {
                    (tags !== undefined) ? (
                        <div className="input-control tags">
                            {
                                tags.map((tag: TagModel) => (
                                    <div key={tag.tagId} className="tag">
                                        <span className="tag-content">
                                            {tag.label}
                                        </span>
                                        <button className="remove-tag material-icons" onClick={() => console.log(tag.tagId)}>close</button>
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