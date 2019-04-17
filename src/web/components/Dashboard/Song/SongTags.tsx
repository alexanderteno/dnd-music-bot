import React, { Component } from 'react';
import TagModel from '../../../models/TagModel';
import Loading from '../../General/Loading';
import AutoSuggest from '../../General/AutoSuggest';
import TagService from '../../../../services/WebApi/TagService';
import SongsService from '../../../../services/WebApi/SongsService';

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

    handleSelect = (tag: TagModel) => {

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
                                    <div key={tag.tagId} className="tag">{tag.label}</div>
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