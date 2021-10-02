// https://www.npmjs.com/package/validatorjs
import Validator from 'validatorjs'; 

export default function validate(req, res, validationRule) {

    const validation = new Validator(req.body, validationRule);

    validation.passes(() => { return });

    validation.fails(() => res.status(412)
        .send({
            success: false,
            message: 'Validation failed',
            data: validation.errors
        }));
}