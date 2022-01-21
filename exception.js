function ConnectionError(message) {
    this.name = "ConnectionError";
    this.message = message;
    return this.name
}
ConnectionError.prototype = Object.create(Error.prototype);
ConnectionError.prototype.constructor = ConnectionError;


function AttributeError(message) {
    this.name = "AttributeError";
    this.message = message;
    return this.name
}
AttributeError.prototype = Object.create(Error.prototype);
AttributeError.prototype.constructor = AttributeError;

function NotFoundError(message) {
    this.name = "NotFoundError";
    this.message = message;
    return this.name
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

function MediaTypeError(message) {
    this.name = "MediaTypeError";
    this.message = message;
    return this.name
}
MediaTypeError.prototype = Object.create(Error.prototype);
MediaTypeError.prototype.constructor = MediaTypeError;

function ServerError(message) {
    this.name = "ServerError";
    this.message = message;
    return this.name
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

function OtherError(message) {
    this.name = "OtherError";
    this.message = message;
    return this.name
}
OtherError.prototype = Object.create(Error.prototype);
OtherError.prototype.constructor = OtherError;

module.exports={ConnectionError,AttributeError,NotFoundError,MediaTypeError,ServerError,OtherError}