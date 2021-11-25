import React from "react";

// implements the assignment B
class MaxTradingVolume extends React.Component {
  calcHighestVolume(data) {
    if (!data || !data.totalVolumes) return undefined;

    let maxVolumeData = [new Date(), -1];
    // volumeData is array of date,volume
    for (const volumeData of data.totalVolumes) {
      const date = volumeData[0];
      const volume = volumeData[1];

      if (volume > maxVolumeData[1]) {
        maxVolumeData[0] = date;
        maxVolumeData[1] = volume;
      }
    }

    return maxVolumeData;
  }

  render() {
    const { data } = this.props;

    const maxVolumeData = this.calcHighestVolume(data);
    if (!maxVolumeData) {
      return (
        <div>
          <div>Maximum Volume: - €</div>
          <div>On date: -</div>
        </div>
      );
    }

    const maxVolumeDate = maxVolumeData[0];
    // volume in euros
    let maxVolume = maxVolumeData[1];
    maxVolume = Number(maxVolume.toPrecision(4));
    // formated date to yyyy-mm-dd format
    const maxVolumeDateStr = `${maxVolumeDate.getUTCFullYear()}-${
      maxVolumeDate.getUTCMonth() + 1
    }-${maxVolumeDate.getUTCDate()}`;

    return (
      <div>
        <div>Maximum Volume: {maxVolume.toLocaleString()}€</div>
        <div>On date: {maxVolumeDateStr}</div>
      </div>
    );
  }
}

export default MaxTradingVolume;
