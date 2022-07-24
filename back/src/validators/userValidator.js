import joi from 'joi';

const registerScema = joi.object({
  nickname: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  sex: joi.string().valid('male', 'female').required(),
  birth:joi.date().required(),
  interest: joi.number().integer().min(1).min(5).required(),
  likeType: joi.string().valid(
    '노말',
		'불꽃',
		'물',
		'풀',
		'전기',
		'얼음',
		'격투',
		'독',
		'땅',
		'비행',
		'에스퍼',
		'벌레',
		'바위',
		'고스트',
		'드래곤',
		'강철',
		'페어리'
    ).required(),
})

const loginScema = joi.object({
	email: joi.string().email().required(),
  password: joi.string().min(4).required(),
})

const profileModifyScema = joi.object({
	nickname: joi.string(),
  interest: joi.number().integer().min(1).max(5),
  likeType: joi.string().valid(
    '노말',
		'불꽃',
		'물',
		'풀',
		'전기',
		'얼음',
		'격투',
		'독',
		'땅',
		'비행',
		'에스퍼',
		'벌레',
		'바위',
		'고스트',
		'드래곤',
		'강철',
		'페어리'
    ),
	profileImg: joi.string()
})

const changePasswordScema = joi.object({
	currentUserId: joi.string().required(),
	password: joi.string().min(4).required()
})



export {registerScema, loginScema, profileModifyScema, changePasswordScema}