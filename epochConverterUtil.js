function EpochConverter(time){
    const ninetyEighty = new Date(Date.UTC(1980, 0, 1, 0, 0, 0));
    const timenew = Math.floor(ninetyEighty.getTime() / 1000);
    const output_epoch_value = time + timenew;
    return output_epoch_value
}

module.exports={EpochConverter}