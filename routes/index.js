var express = require('express');
var router = express.Router();



const jwt = require('jsonwebtoken');

// POST /login 요청 body에 id와 password를 함께 실어서 요청으로 가정 (사실 id와 password는 암호화 되어있음)
router.post('/login', (req, res, next) => {

  //받은 요청의 id와 password로 DB에서 프로필사진, 닉네임 등 로그인 정보를 가져온다.
  const nickname = "CharmingKyu";
  const profile = 'imageURL';

  //jwt.sign(payload, secretOrPrivateKey, [options, callback])
  token = jwt.sign({
    type: 'JWT',
    nickname: nickname,
    profile: profile
  }, SECRET_KEY, {
    expiresIn: '10', // 만료시간 15분
    issuer: '토큰발급자',
  });

  //response
  return res.status(200).json({
    code: 200,
    message: '토큰이 발급되었습니다.',
    token: token
  });
});

const { auth } = require('./authMiddleware');
const SECRET_KEY = 'MY-SECRET-KEY';
router.get('/payload', auth, (req, res) => {
  const nickname = req.decoded.nickname;
  const profile = req.decoded.profile;
  const issuer = req.decoded.issuer;
  return res.status(200).json({
    code: 200,
    message: '토큰은 정상입니다.',
    data: {
      nickname: nickname,
      profile: profile
    }
  });
});


module.exports = router;
