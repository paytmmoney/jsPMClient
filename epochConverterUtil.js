function EpochConverter(time){
    // Value of ninetyEightyConstant is derived by -
    // const ninetyEighty = new Date(Date.UTC(1980, 0, 1, 0, 0, 0));
    // const ninetyEightyConstant = Math.floor(ninetyEighty.getTime() / 1000);
    ninetyEightyConstant = 315532800
    const output_epoch_value = time + ninetyEightyConstant;
    return output_epoch_value
}

module.exports={EpochConverter}