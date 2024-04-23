#! /usr/bin/env node

require('dotenv').config();

console.log(
  'This script populates some test items, categories, and series to your database.',
);

const Item = require('./models/item');
const Category = require('./models/category');
const Series = require('./models/series');

const items = [];
const categories = [];
const series = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createSeries();
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function itemCreate(
  index,
  name,
  description,
  price,
  quantity,
  series,
  category,
) {
  const item = new Item({
    name: name,
    description: description,
    price: price,
    quantity: quantity,
    series: series,
  });

  if (category != false) item.category = category;

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function categoryCreate(index, name, description) {
  const category = new Category({
    name: name,
    description: description,
  });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${category}`);
}

async function seriesCreate(index, name, description) {
  const seriesToAdd = new Series({
    name: name,
    description: description,
  });
  await seriesToAdd.save();
  series[index] = seriesToAdd;
  console.log(`Added category: ${seriesToAdd}`);
}

async function createSeries() {
  console.log('Adding series');
  await Promise.all([
    seriesCreate(
      0,
      'Laid-Back Camp',
      'While the perfect getaway for most girls her age might be a fancy vacation with their loved ones, Rin Shima\'s ideal way of spending her days off is camping alone at the base of Mount Fuji. From pitching her tent to gathering firewood, she has always done everything by herself, and has no plans of leaving her little solitary world.\\nHowever, what starts off as one of Rin\'s usual camping sessions somehow ends up as a surprise get-together for two when the lost Nadeshiko Kagamihara is forced to take refuge at her campsite. Originally intending to see the picturesque view of Mount Fuji for herself, Nadeshiko\'s plans are disrupted when she ends up falling asleep partway to her destination. Alone and with no other choice, she seeks help from the only other person nearby. Despite their hasty introductions, the two girls nevertheless enjoy the chilly night together, eating ramen and conversing while the campfire keeps them warm. And even after Nadeshiko\'s sister finally picks her up later that night, both girls silently ponder the possibility of another camping trip together.',
    ),
    seriesCreate(
      1,
      'Bocchi the Rock!',
      'Yearning to make friends and perform live with a band, lonely and socially anxious Hitori \"Bocchi\" Gotou devotes her time to playing the guitar. On a fateful day, Bocchi meets the outgoing drummer Nijika Ijichi, who invites her to join Kessoku Band when their guitarist, Ikuyo Kita, flees before their first show. Soon after, Bocchi meets her final bandmate—the cool bassist Ryou Yamada.\\nAlthough their first performance together is subpar, the girls feel empowered by their shared love for music, and they are soon rejoined by Kita. Finding happiness in performing, Bocchi and her bandmates put their hearts into improving as musicians while making the most of their fleeting high school days.',
    ),
    seriesCreate(
      2,
      'That Time I Got Reincarnated as a Slime',
      'Thirty-seven-year-old Satoru Mikami is a typical corporate worker, who is perfectly content with his monotonous lifestyle in Tokyo, other than failing to nail down a girlfriend even once throughout his life. In the midst of a casual encounter with his colleague, he falls victim to a random assailant on the streets and is stabbed. However, while succumbing to his injuries, a peculiar voice echoes in his mind, and recites a bunch of commands which the dying man cannot make sense of.\\nWhen Satoru regains consciousness, he discovers that he has reincarnated as a goop of slime in an unfamiliar realm. In doing so, he acquires newfound skills—notably, the power to devour anything and mimic its appearance and abilities. He then stumbles upon the sealed Catastrophe-level monster \"Storm Dragon\" Veldora who had been sealed away for the past 300 years for devastating a town to ashes. Sympathetic to his predicament, Satoru befriends him, promising to assist in destroying the seal. In return, Veldora bestows upon him the name Rimuru Tempest to grant him divine protection.\\nNow, liberated from the mundanities of his past life, Rimuru embarks on a fresh journey with a distinct goal in mind. As he grows accustomed to his new physique, his gooey antics ripple throughout the world, gradually altering his fate.',
    ),
    seriesCreate(
      3,
      'Kill la Kill',
      'After the murder of her father, Ryuuko Matoi has been wandering the land in search of his killer. Following her only lead—the missing half of his invention, the Scissor Blade—she arrives at the prestigious Honnouji Academy, a high school unlike any other. The academy is ruled by the imposing and cold-hearted student council president Satsuki Kiryuuin alongside her powerful underlings, the Elite Four. In the school\'s brutally competitive hierarchy, Satsuki bestows upon those at the top special clothes called \"Goku Uniforms,\" which grant the wearer unique superhuman abilities.\\nThoroughly beaten in a fight against one of the students in uniform, Ryuuko retreats to her razed home where she stumbles across Senketsu, a rare and sentient \"Kamui,\" or God Clothes. After coming into contact with Ryuuko\'s blood, Senketsu awakens, latching onto her and providing her with immense power. Now, armed with Senketsu and the Scissor Blade, Ryuuko makes a stand against the Elite Four, hoping to reach Satsuki and uncover the culprit behind her father\'s murder once and for all.',
    ),
    seriesCreate(
      4,
      'Spy x Family',
      'Corrupt politicians, frenzied nationalists, and other warmongering forces constantly jeopardize the thin veneer of peace between neighboring countries Ostania and Westalis. In spite of their plots, renowned spy and master of disguise \"Twilight\" fulfills dangerous missions one after another in the hope that no child will have to experience the horrors of war.\\nIn the bustling Ostanian city of Berlint, Twilight dons the alias of \"Loid Forger,\" an esteemed psychiatrist. However, his true intention is to gather intelligence on prominent politician Donovan Desmond, who only appears rarely in public at his sons\' school: the prestigious Eden Academy. Enlisting the help of unmarried city hall clerk Yor Briar to act as his wife and adopting the curious six-year-old orphan Anya as his daughter, Loid enacts his master plan. He will enroll Anya in Eden Academy, where Loid hopes she will excel and give him the opportunity to meet Donovan without arousing suspicion.\\nUnfortunately for Loid, even a man of his talents has trouble playing the figure of a loving father and husband. And just like Loid is hiding his true identity, Yor—who is an underground assassin known as \"Thorn Princess\"—and Anya—an esper who can read people\'s minds—have no plans to disclose their own secrets either. Although this picture-perfect family is founded on deception, the Forgers gradually come to understand that the love they share for one another trumps all else.',
    ),
    seriesCreate(
      5,
      'Haikyu!!',
      'Ever since having witnessed the \"Little Giant\" and his astonishing skills on the volleyball court, Shouyou Hinata has been bewitched by the dynamic nature of the sport. Even though his attempt to make his debut as a volleyball regular during a middle school tournament went up in flames, he longs to prove that his less-than-impressive height ceases to be a hindrance in the face of his sheer will and perseverance.\\nWhen Hinata enrolls in Karasuno High School, the Little Giant\'s alma mater, he believes that he is one step closer to his goal of becoming a professional volleyball player. Although the school only retains a shadow of its former glory, Hinata\'s conviction isn\'t shaken until he learns that Tobio Kageyama—the prodigy who humiliated Hinata\'s middle school volleyball team in a crushing defeat—is now his teammate.\\nTo fulfill his desire of leaving a mark on the realm of volleyball—so often regarded as the domain of the tall and the strong—Hinata must smooth out his differences with Kageyama. Only when Hinata learns what it takes to be a part of a team will he be able to join the race to the top in earnest.',
    ),
  ]);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(
      0,
      'Apparel',
      'Clothing such as hoodies, jackets, T-shirts, hats, and socks.',
    ),
    categoryCreate(
      1,
      'Figures',
      'Scale, non-scale, articulated, and chibi sculptures of popular characters.',
    ),
    categoryCreate(
      2,
      'Manga',
      'Japanese-style comic books and graphic novels.',
    ),
    categoryCreate(
      3,
      'Accessories',
      'Miscellaneous goods such as keychains, pins, bags, backpacks, and blind boxes.',
    ),
    categoryCreate(
      4,
      'Blu-Rays',
      'Movies and series in a high-quality video format in disc format.',
    ),
  ]);
}

async function createItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate(
      0,
      'Haikyu!! Manga Volume 1',
      'Haikyu!! Volume 1 features story and art by Haruichi Furudate\\nEver since he saw the legendary player known as the \"Little Giant\" compete at the national volleyball finals, Shoyo Hinata has been aiming to be the best volleyball player ever! He decides to join the team at the high school the Little Giant went to-and then surpass him. Who says you need to be tall to play volleyball when you can jump higher than anyone else?\\nAfter losing his first and last volleyball match against Tobio Kageyama, the King of the Court, Shoyo Hinata swears to become his rival after graduating middle school. But what happens when the guy who is supposed to be his rival ends up being his teammate?!',
      999,
      3,
      series[5],
      [categories[2]],
    ),
    itemCreate(
      1,
      'Haikyu!! Manga Volume 2',
      'Haikyu!! Volume 2 features story and art by Haruichi Furudate\\nEver since he saw the legendary player known as the \"Little Giant\" compete at the national volleyball finals, Shoyo Hinata has been aiming to be the best volleyball player ever! He decides to join the team at the high school the Little Giant went to-and then surpass him. Who says you need to be tall to play volleyball when you can jump higher than anyone else?\\nAfter proving themselves to be the ultimate combination in their practice match against Tsukishima, Kageyama and Hinata are finally allowed to join the club! Hinata\’s true power—to perfectly time his spikes with his eyes closed—is awakened and nothing can seem to stop this crazy setter-spiker duo. Now their skills are about to put to the test at a practice match against one of Kageyama\’s former teammates from middle school, Toru Oikawa.',
      999,
      4,
      series[5],
      [categories[2]],
    ),
    itemCreate(
      2,
      'Bocchi the Rock! Manga Volume 1',
      'Bocchi the Rock! Manga Volume 1 features story and art by Aki Hamazi.\\nBocchi finally takes the stage in English, and she\’s brought her best friend—crippling anxiety! Hitori Goto just wants to make friends, but the thought of approaching a stranger on her own makes her so nervous that she\’s spent the entirety of middle school teaching herself how to shred on the guitar—to moderately successful (albeit anonymous) YouTube fame—in the hopes of seeming cool enough for someone else to reach out to her instead.\\nAfter bringing her guitar to school provokes zero interest, Hitori\’s just about ready to shrivel up and die...which is when Nijika Ijichi comes across her moping in a playground and begs her to fill in for her band\’s flakey guitarist for their first-ever live performance! It\’s like her wish came true—but does this most antisocial of introverts have what it takes to perform in front of real people?!',
      1499,
      7,
      series[1],
      [categories[2]],
    ),
    itemCreate(
      3,
      'Bocchi the Rock! - The Complete Season - Blu-ray',
      'Hitori Gotoh, aka Bocchi-chan, plays guitar in hopes of joining a band. And while she\’s famous online, what\’s holding her back is that she\’s incredibly introverted. That is, until a desperate drummer gets Bocchi-chan out of her shell and onto the stage.',
      6998,
      2,
      series[1],
      [categories[4]],
    ),
    itemCreate(
      4,
      'KILL la KILL Complete Box Set Blu-ray',
      'KILL la KILL Complete Box Set contains episodes 1-24 and the unaired episode #25 of the anime directed by Hiroyuki Imaishi plus a Booklet.\\n\“Life Fiber Synchronize! Kamui Senketsu!!\”\\nThe anime created by the legendary duo of Kazuki Nakashima and Hiroyuki Imaishi (Gurren Lagann) is finally reborn as a complete Blu-ray box set!\\nHonnouji Academy, a school ruled by students clad in special outfits called Goku Uniforms. Deriding the student body as \"pigs in human clothing,\" Student Council President Satsuki Kiryuin, along with her loyal lieutenants, the Elite Four, takes absolute control of the entire campus. One day, a vagrant schoolgirl named Ryuko Matoi appears and tries to get Satsuki, who recognizes her Scissor Blade, to talk. Was their encounter mere coincidence, or was it fate? The clash between the two will soon consume the whole academy!',
      19998,
      1,
      series[3],
      [categories[4]],
    ),
    itemCreate(
      5,
      'Spy X Family - Yor Forger SS T-Shirt',
      'Unleash your inner Thorn Princess with this stylish Yor Forger tee! It\’s the perfect shirt for those leading a double life — especially if you happen to be a mild-mannered office worker and also a lethal assassin with blades sharper than your cooking skills.',
      2995,
      10,
      series[4],
      [categories[0]],
    ),
    itemCreate(
      6,
      'Shion That Time I Got Reincarnated as a Slime Pop Up Parade Figure',
      'From \"That Time I Got Reincarnated as a Slime\" comes a POP UP PARADE figure of Shion! Be sure to display Shion together with other POP UP PARADE figures from \"That Time I Got Reincarnated as a Slime\"!',
      4399,
      0,
      series[2],
      [categories[1]],
    ),
    itemCreate(
      7,
      'Laid-Back Camp - Rin Shima Figma (DX Ver.)',
      '\"Soup-style pasta on Mt. Takabotchi... delicious.\" From the anime series \"Laid-Back Camp\" comes a DX edition figma of Rin Shima!',
      14299,
      2,
      series[0],
      [categories[1]],
    ),
    itemCreate(
      8,
      'Bocchi the Rock! Acrylic Keychain',
      'It is a acrylic keychain using the logo of Special Live Event.',
      799,
      0,
      series[1],
      [categories[3]],
    ),
    itemCreate(
      9,
      'Milim Nava That Time I Got Reincarnated as a Slime Nendoroid Pin',
      'From the popular series \"That Time I Got Reincarnated as a Slime\" comes a Nendoroid Pin of Milim Nava.',
      1500,
      5,
      series[2],
      [categories[3]],
    ),
    itemCreate(
      10,
      'KILL la KILL - Ryuko Matoi Large Pop Up Parade Figure (Souvenir Jacket Ver.)',
      'Presenting POP UP PARADE figures now in a larger size!\\nPOP UP PARADE is bringing figure fans a brand new sense of excitement with the L line.',
      5799,
      8,
      series[3],
      [categories[1]],
    ),
    itemCreate(
      11,
      'Haikyu!! - Figural Bag Clip Set',
      'Size: approximately 2.5 inches tall',
      3000,
      3,
      series[5],
      [categories[3]],
    ),
  ]);
}
