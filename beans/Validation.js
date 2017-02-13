/**
 * Created by Thomas on 13/02/2017.
 */
class TypeValidation extends Enum{}
TypeValidation.initEnum(['ValidationConnexion']);

class Validation{
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}
