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
      "While the perfect getaway for most girls her age might be a fancy vacation with their loved ones, Rin Shima\'s ideal way of spending her days off is camping alone at the base of Mount Fuji. From pitching her tent to gathering firewood, she has always done everything by herself, and has no plans of leaving her little solitary world.\\nHowever, what starts off as one of Rin\'s usual camping sessions somehow ends up as a surprise get-together for two when the lost Nadeshiko Kagamihara is forced to take refuge at her campsite. Originally intending to see the picturesque view of Mount Fuji for herself, Nadeshiko\'s plans are disrupted when she ends up falling asleep partway to her destination. Alone and with no other choice, she seeks help from the only other person nearby. Despite their hasty introductions, the two girls nevertheless enjoy the chilly night together, eating ramen and conversing while the campfire keeps them warm. And even after Nadeshiko\'s sister finally picks her up later that night, both girls silently ponder the possibility of another camping trip together.",
    ),
    seriesCreate(
      1,
      'Bocchi the Rock!',
      'Yearning to make friends and perform live with a band, lonely and socially anxious Hitori "Bocchi" Gotou devotes her time to playing the guitar. On a fateful day, Bocchi meets the outgoing drummer Nijika Ijichi, who invites her to join Kessoku Band when their guitarist, Ikuyo Kita, flees before their first show. Soon after, Bocchi meets her final bandmate—the cool bassist Ryou Yamada.\\nAlthough their first performance together is subpar, the girls feel empowered by their shared love for music, and they are soon rejoined by Kita. Finding happiness in performing, Bocchi and her bandmates put their hearts into improving as musicians while making the most of their fleeting high school days.',
    ),
    seriesCreate(
      2,
      'That Time I Got Reincarnated as a Slime',
      'Thirty-seven-year-old Satoru Mikami is a typical corporate worker, who is perfectly content with his monotonous lifestyle in Tokyo, other than failing to nail down a girlfriend even once throughout his life. In the midst of a casual encounter with his colleague, he falls victim to a random assailant on the streets and is stabbed. However, while succumbing to his injuries, a peculiar voice echoes in his mind, and recites a bunch of commands which the dying man cannot make sense of.\\nWhen Satoru regains consciousness, he discovers that he has reincarnated as a goop of slime in an unfamiliar realm. In doing so, he acquires newfound skills—notably, the power to devour anything and mimic its appearance and abilities. He then stumbles upon the sealed Catastrophe-level monster "Storm Dragon" Veldora who had been sealed away for the past 300 years for devastating a town to ashes. Sympathetic to his predicament, Satoru befriends him, promising to assist in destroying the seal. In return, Veldora bestows upon him the name Rimuru Tempest to grant him divine protection.\\nNow, liberated from the mundanities of his past life, Rimuru embarks on a fresh journey with a distinct goal in mind. As he grows accustomed to his new physique, his gooey antics ripple throughout the world, gradually altering his fate.',
    ),
    seriesCreate(
      3,
      'New Game!',
      'Since childhood, Aoba Suzukaze has loved the Fairies Story game series, particularly the character designs. So when she graduates from high school, it is no surprise that she applies to work at Eagle Jump, the company responsible for making her favorite video game. On her first day, she is excited to learn that she will be working on a new installment to the series: Fairies Story 3—and even more so under Kou Yagami, the lead character designer.\\nIn their department are people who share the same passion for games. There is Yun Iijima, whose specialty is designing monsters; the shy Hifumi Takimoto, who prefers to communicate through instant messaging; Hajime Shinoda, an animation team member with an impressive figurine collection; Rin Tooyama, the orderly art director; Shizuku Hazuki, the game director who brings her cat to work; and Umiko Ahagon, the short-tempered head programmer.\\nNew Game! follows Aoba and the others on their adventure through the ups and downs of game making, from making the perfect character design to fixing all the errors that will inevitably accumulate in the process.',
    ),
    seriesCreate(
      4,
      'Do It Yourself!!',
      "The Fourth Industrial Revolution has led to the development of cutting-edge technologies that have rapidly evolved the world. As a result, schools have begun incorporating these technologies into their curriculum, leaving behind the ways of the old. One such institution is the elite Yuyu Girls\' Vocational High School, where both Serufu Yua and her childhood friend, Miku \"Purin\" Suride, have applied. Although the tech-savvy Purin is accepted to Yuyu High, the accident-prone Serufu is rejected and enters the traditional Gatagata Girls\' High School instead, driving a wedge into their friendship.\\nOn her way to class one day, Serufu gets into a bike accident, and Rei Yasaku, a passerby who attends the same school, fixes her damaged bicycle. Serufu later finds out that Rei has a passion for old-fashioned crafts and is the head of the school\'s Do-It-Yourself (DIY) Club—which is in danger of closing due to a lack of members.\\nRealizing that this may be her chance to repair her relationship with Purin, Serufu joins the club in hopes of creating projects that could bring them together once more. As the DIY Club welcomes new faces, Serufu learns to build not only handicrafts but also new friendships along the way!",
    ),
    seriesCreate(
      5,
      'Kill la Kill',
      'After the murder of her father, Ryuuko Matoi has been wandering the land in search of his killer. Following her only lead—the missing half of his invention, the Scissor Blade—she arrives at the prestigious Honnouji Academy, a high school unlike any other. The academy is ruled by the imposing and cold-hearted student council president Satsuki Kiryuuin alongside her powerful underlings, the Elite Four. In the school\'s brutally competitive hierarchy, Satsuki bestows upon those at the top special clothes called "Goku Uniforms," which grant the wearer unique superhuman abilities.\\nThoroughly beaten in a fight against one of the students in uniform, Ryuuko retreats to her razed home where she stumbles across Senketsu, a rare and sentient \"Kamui,\" or God Clothes. After coming into contact with Ryuuko\'s blood, Senketsu awakens, latching onto her and providing her with immense power. Now, armed with Senketsu and the Scissor Blade, Ryuuko makes a stand against the Elite Four, hoping to reach Satsuki and uncover the culprit behind her father\'s murder once and for all.',
    ),
    seriesCreate(
      6,
      'Spy x Family',
      'Corrupt politicians, frenzied nationalists, and other warmongering forces constantly jeopardize the thin veneer of peace between neighboring countries Ostania and Westalis. In spite of their plots, renowned spy and master of disguise "Twilight" fulfills dangerous missions one after another in the hope that no child will have to experience the horrors of war.\\nIn the bustling Ostanian city of Berlint, Twilight dons the alias of "Loid Forger," an esteemed psychiatrist. However, his true intention is to gather intelligence on prominent politician Donovan Desmond, who only appears rarely in public at his sons\' school: the prestigious Eden Academy. Enlisting the help of unmarried city hall clerk Yor Briar to act as his wife and adopting the curious six-year-old orphan Anya as his daughter, Loid enacts his master plan. He will enroll Anya in Eden Academy, where Loid hopes she will excel and give him the opportunity to meet Donovan without arousing suspicion.\\nUnfortunately for Loid, even a man of his talents has trouble playing the figure of a loving father and husband. And just like Loid is hiding his true identity, Yor—who is an underground assassin known as "Thorn Princess"—and Anya—an esper who can read people\'s minds—have no plans to disclose their own secrets either. Although this picture-perfect family is founded on deception, the Forgers gradually come to understand that the love they share for one another trumps all else.',
    ),
    seriesCreate(
      7,
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
      series[7],
      [categories[2]],
    ),
    itemCreate(
      1,
      'Haikyu!! Manga Volume 2',
      'Haikyu!! Volume 2 features story and art by Haruichi Furudate\\nEver since he saw the legendary player known as the \"Little Giant\" compete at the national volleyball finals, Shoyo Hinata has been aiming to be the best volleyball player ever! He decides to join the team at the high school the Little Giant went to-and then surpass him. Who says you need to be tall to play volleyball when you can jump higher than anyone else?\\nAfter proving themselves to be the ultimate combination in their practice match against Tsukishima, Kageyama and Hinata are finally allowed to join the club! Hinata\’s true power—to perfectly time his spikes with his eyes closed—is awakened and nothing can seem to stop this crazy setter-spiker duo. Now their skills are about to put to the test at a practice match against one of Kageyama\’s former teammates from middle school, Toru Oikawa.',
      999,
      4,
      series[7],
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
  ]);
}
