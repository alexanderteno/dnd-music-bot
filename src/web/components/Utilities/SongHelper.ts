class SongHelper {

  static formatDuration(value: number) {

    const hours = Math.floor(value / 60 / 60);
    const minutes = Math.floor((value - (hours * 60)) / 60);
    const seconds = Math.floor(value % 60);

    const result: string[] = [];

    if (hours) {
      result.push(`${hours}h`);
    }

    if (minutes) {
      result.push(`${minutes}m`);
    }

    if (seconds) {
      result.push(`${seconds}s`);
    }

    return result.join(' ');

  }

}

export default SongHelper;