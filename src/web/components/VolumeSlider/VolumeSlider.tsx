import React, { useState, useEffect } from 'react';
import Container from '../General/Container';
import PlayerService from '../../../services/WebApi/PlayerService';
import { debounce } from 'lodash';
import './VolumeSlider.scss';

const getVolumeIcon = (volume: number) => {
    if (volume == 0) {
        return "volume_mute";
    } else if (0 < volume && volume < 1) {
        return "volume_down";
    } else {
        return "volume_up";
    }
}

const VolumeSlider = () => {
    const [volume, setVolume] = useState(undefined);

    useEffect(() => {
        PlayerService.getVolume()
            .then((volume: number | undefined) => {
                setVolume(volume);
            })
    }, [volume])

    const handleSetVolume = debounce((debounceVolume: number) => {
        PlayerService.setVolume(debounceVolume)
            .then((responseVolume) => {
                setVolume(responseVolume);
            })
    }, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const eventVolume = parseFloat(e.currentTarget.value);
        if (!isNaN(eventVolume)) {
            handleSetVolume(eventVolume);
        }
    };

    return (
        <Container
            iconLigature={getVolumeIcon(volume)}
            className="volume-slider"
            title="Volume"
            loading={volume === undefined}
        >
            <input
                type="range"
                min="0"
                step="0.01"
                max="2"
                value={volume}
                className="volume-slider"
                onChange={handleChange}
            />
        </Container>
    )
}

export default VolumeSlider;