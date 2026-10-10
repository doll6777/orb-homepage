(function (root) {
  'use strict';
  const axisIds = ['outward','information','decision','structure','novelty','uncertainty','social','persistence'];
  // Editorial character prototypes, NOT MBTI/TCI norms or diagnostic cutoffs.
  // Values refer only to the corresponding original questionnaire's 0..4 answers.
  const profiles = [
    {id:1,values:[1,3,3,1,1,4,4,3]},
    {id:2,values:[4,2,4,3,3,1,4,2]},
    {id:3,values:[0,0,1,0,0,1,1,4]},
    {id:4,values:[2,1,3,0,1,3,3,4]},
    {id:5,values:[0,1,2,1,1,4,3,2]},
    {id:6,values:[0,3,4,2,1,3,4,3]},
    {id:7,values:[1,1,4,0,1,4,4,2]},
    {id:8,values:[3,2,4,1,1,3,4,3]},
    {id:9,values:[2,1,4,3,1,2,4,2]},
    {id:10,values:[4,3,3,4,4,0,4,1]},
    {id:11,values:[3,1,4,2,2,0,4,3]},
    {id:12,values:[3,0,4,0,0,2,4,4]},
    {id:13,values:[1,0,0,0,0,2,1,4]},
    {id:14,values:[1,0,1,0,0,0,2,4]},
    {id:15,values:[3,1,4,1,1,1,3,4]},
    {id:16,values:[1,0,1,0,1,4,2,4]},
    {id:17,values:[1,2,1,0,1,2,1,4]},
    {id:18,values:[2,0,3,0,2,3,3,3]},
    {id:19,values:[1,3,0,0,3,1,1,4]},
    {id:20,values:[0,0,0,1,1,3,0,4]},
    {id:21,values:[3,4,2,4,4,0,2,1]},
    {id:22,values:[2,4,3,4,4,1,3,0]},
    {id:23,values:[2,3,1,4,3,2,1,2]},
    {id:24,values:[2,4,0,3,4,0,1,3]},
    {id:25,values:[4,2,1,4,4,0,2,2]},
    {id:26,values:[1,1,1,1,1,0,0,2]},
    {id:27,values:[2,1,0,1,1,0,1,3]},
    {id:28,values:[0,1,1,1,1,1,0,4]},
    {id:29,values:[1,2,2,3,1,1,1,2]},
    {id:30,values:[0,3,2,0,2,2,1,3]}
  ];

  function match(answers, data) {
    const isValue = value => Number.isInteger(value) && value >= 0 && value <= 4;
    const unanswered = data.questions.filter(q => !Object.hasOwn(answers,q.id) || !(answers[q.id] === null || isValue(answers[q.id]))).map(q=>q.id);
    if (unanswered.length) return {status:'incomplete',unanswered};
    const observed = axisIds.map(id => {
      const values = data.questions.filter(q=>q.dimension===id).map(q=>answers[q.id]);
      return values.length===3 && values.every(isValue) ? values.reduce((a,b)=>a+b,0) : null;
    });
    const missingAxes = axisIds.filter((id,i)=>observed[i]===null);
    // A draft UX coverage guard, not an empirically calibrated reliability threshold.
    if (observed.slice(0,4).filter(v=>v!==null).length<3 || observed.slice(4).filter(v=>v!==null).length<3) {
      return {status:'insufficient',missingAxes};
    }
    // Comparing integer sums avoids floating-point errors when detecting exact ties.
    const ranked = profiles.map(profile=>({
      id:profile.id,
      distance:observed.reduce((total,value,i)=>value===null?total:total+(value-profile.values[i]*3)**2,0)
    })).sort((a,b)=>a.distance-b.distance||a.id-b.id);
    const candidates = ranked.filter(p=>p.distance===ranked[0].distance).map(p=>p.id);
    const profile = Object.fromEntries(axisIds.map((id,i)=>[id,observed[i]===null?null:observed[i]/3]));
    return {status:candidates.length===1?'matched':'tie',typeId:candidates.length===1?candidates[0]:null,candidates,missingAxes,profile};
  }
  root.OMOKI_MATCHING = Object.freeze({version:'editorial-v0.3',axisIds,profiles,match});
})(typeof window === 'undefined' ? globalThis : window);
