import { ProfileDataSchema } from 'infra/database/schemas/ProfileDataSchema';
import { IProfileData } from 'contracts/entities/IProfileData';

import { ProfileAnalysis } from 'entities/ProfileAnalysis';
import { default as Database } from 'infra/database/Connection';
// import { default as Server } from 'infra/server/Server';
import { ProfileAnalysisService } from 'services/ProfileAnalysisService';
import { model } from 'mongoose';
import { writeFileSync } from 'fs';

const filename = 'unique-mention-ratio.csv';
const property = 'mentionsPerUserScore';

(async () => {
  await Promise.all([Database.init()]);

  model<IProfileData>('ProfileData', ProfileDataSchema);

  const profileAnalysisService = new ProfileAnalysisService();

  let allAnalysis = await profileAnalysisService.findWithProfileData({});

  // gerando novas dados de analise

  for (const analysis of allAnalysis) {
    const newAnalysis = new ProfileAnalysis(analysis);

    await profileAnalysisService.update({ _id: analysis._id }, newAnalysis);
  }

  // reload
  allAnalysis = await profileAnalysisService.findWithProfileData({});

  // escrevendo csv
  writeFileSync(
    filename,
    JSON.stringify(
      allAnalysis.map((e) => `${e[property]},${e.accountType}`).join('\n'),
    ),
  );

  console.log('done');
  process.exit(1);
})();
