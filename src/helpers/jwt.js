const jwt = require('jsonwebtoken');
const secret = '2ne-4U_rYn8&ReuQX42HfMEa2wL^4eAeNpRtVm2#*%gDREQ^5u2#Rr-Lf*z!qY3$r*?CBVcFgtV%%z+5#H=+#-wfQwn-avC@?RxT+7YWkK^xzLu^NEgA*P3gLjMYd4t%fHq3HTU-PPZYpeYNg*B!5hLnW*YQbdyLFp!Sn8SrLE#jq6MT6G-uh-$hZBRhWx-QZHpPVM!XGVrSwyg@GSf-8zVEpMCXgYrbE9z#N9DVWV27#LunxvVPA!CGCG_Lt*xp_TG%c&LpG!AS3H$H#hdMg$N+Rw^Kg!yj3E24uNCQ7#MGQvcR%eD8@wmyJZG_HyzT&mj+PCDD-ZAyFCJt5NhZntrphXDbhmb7$bR*vP9&C?s=h2sb-vxRhU?m3zMU2y%+Uh^XXNpT9NVL-&HYAa-%+zghuR!9urL-!#jH5-ng&MaL=eE&y=rx?L7#n2AB$WT^FLmH&vmsJUaY5k%@tnf_*zJLGnNs%8BU7bP_TjNHtP#?LEkw5fxmCnz9wZRdsP7e8@5Tyv@#k-_RfV8RQyr8vug25BeabnaBhDqU?g%?*?MSfm%-TmZMJJgFbt9TtGrArj48F29ZSd&L*VrUFX4%_J=8GbdMAzJxn-3MDuwDpC&u9KK%fS7E8utV_hXMcg3&3JcWYAf3usv7Jf@Y39HvhmU-xFKf83bRyNfBYPWmj4sgf9uAU8?JEc+cEv82A2?ntk%??VHrTx+u!tx2vd%3nUmzqNPY*UVVME8PNWK3vHMS6f@bZCq&b&V=F5!kZD!Kx%zQTrZ%B855zzHh$sN-x#CZ#QJyZXfqDH!5RtXVXK5D8G8f!k=A#K^M$FfNF*!?qQTr%Zdk^7d7XJv+Abu6FC5y4!zg8_E+75s5q+*fraJ_u&JhJh@hYXj66x-*z-MurbGdrQx5?6uKB#G7-TUx!89B@whZW^7w=zpuSq*xj2Ub^WU&ywJW!D^2nL+mMayRYB?A@Knmg@yG5gCe7Z&nMH%-FhY*jVqC$-RbkxMPs!?zSjTUXZ=fkZvgDpRgD@Sfka?*uya4DtEzZ$L3bvndywpN3wpepXeRu?mBQaJwvjRTXN&-V9vP^DNyajZ4FR-VDAJX8&eJWRtR3s9UJsT3s-GdmBtg?NPMzNRAfH5b?Q*2rfD=crkjprPw7-s#&5MZAnx7awVYss-aqnS$6_W+wH_TtPJtULS?g*V=qKWa7#DEn#UvTEgUBeuHK%P8a*7379JrUqg=zeFp5pknGA@5_aXBMN^r!yehKFwZ$HUrgaMPesEFZs+JeZhc$eQLyw-@^5?cYkfTfPUFS9seVkrPE=FFm_aTtR%g88bh&g?7MNUm?6f9VVXKe8Y-Gtx$yQ3r?g4B@B!Vg6Jnr6qQJSjGLC8TvekHcMUZRrp2m-_Lr8!T?@wC9kVZm%5up+!$@_@rmBMaqsZ=bz^=rw#Gfq7MRTzdZ#4tnc?gR&hALxkK=WMram-ctZ8zDB6#UyQmt32B9pKD2gmD*QNWvu*4FEZPQuZRyQ!M*q@%J=mM@PYxR$JkCyP+YAUdb@nJNa_?Lbwsu!J-B%4b7DDpmY4XAqbdzyvd=3H=v=*hb3=7%Gt?wRmgh_ZD%SCXFv-3S=hUSEPxy_SJPLP%g4+E$LDE8Q9Jd+uz2n4H6T6GBAy9CQD7?UTTDf5BJR?Z62@3k@RMtyvuc-w7DBFgPP$&WW_V&x#F_DZv$8!q2HfypPK5pJW?G-pHHUmRtf&gDvC6&sTMn9MwJA*Q=5%TQ@RzXcvh^RTuLp&V*2ZNUGuVeH?m3*WyQ#N7BA5aAgW7-^=3#mbGPv^R=6t^9xLr+WpM4wVGh+n_f6V!8JzU&k+aYRZ^99=N5d_3?5Qu#xb5YfzpAkErmcw5?3cT=_Ja#F+bD+%ZK3&tqRwKsZz7Sk$wH5ZSGrh3Lz$&muN-sUKe+K7kp*Tx4p@Zcks^xX6-b88?dj!zBn_@X^F^VdXSBgDAdT3TEWH*9HK@dCsw*aLmpz?3Rv5^_p-8jW#_G+n_LB@gawMe^fp2v!XS7Fa@F6h3n9Z-mTCCmr+4ELss42qFWUQbD@w#wk^X';
const issuer = 'costAdministrationServer';
const audience = 'cost:user';
const subject = 'user:authentification';

module.exports.create = function(username) {
  //create a new token wich is valid one hour
  return jwt.sign(
      {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        sub: subject,
        iss: issuer,
        user: username,
        aud: audience
      }, secret);
};

module.exports.connect = function(jwt, cb) {
  jwt.verify(jwt, secret, function(err, decoded) {
    cb(err, decoded);
  });
};