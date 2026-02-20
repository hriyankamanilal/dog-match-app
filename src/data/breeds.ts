export interface Breed {
  name: string;
  description: string;
  temperament: string;
  popularity: number | null;
  minHeight: number; // cm
  maxHeight: number; // cm
  minWeight: number; // kg
  maxWeight: number; // kg
  minExpectancy: number;
  maxExpectancy: number;
  group: string;
  groomingFrequencyValue: number;
  groomingFrequencyCategory: string;
  sheddingValue: number;
  sheddingCategory: string;
  energyLevelValue: number;
  energyLevelCategory: string;
  trainabilityValue: number;
  trainabilityCategory: string;
  demeanorValue: number;
  demeanorCategory: string;
  // Derived fields
  sizeCategory: "Small" | "Medium" | "Large" | "Giant";
  isAllergyFriendly: boolean;
  isApartmentFriendly: boolean;
  isGoodWithKids: boolean;
  isGoodWithPets: boolean;
  imageUrl: string;
}

function getSizeCategory(avgHeight: number, avgWeight: number): "Small" | "Medium" | "Large" | "Giant" {
  if (avgWeight < 10 || avgHeight < 35) return "Small";
  if (avgWeight < 25 || avgHeight < 55) return "Medium";
  if (avgWeight < 45 || avgHeight < 68) return "Large";
  return "Giant";
}

function getBreedImage(name: string): string {
  // Direct CDN image URLs from Dog CEO (images.dog.ceo)
  const breedImageMap: Record<string, string> = {
    "Labrador Retriever": "https://images.dog.ceo/breeds/labrador/n02099712_7877.jpg",
    "French Bulldog": "https://images.dog.ceo/breeds/bulldog-french/n02108915_2350.jpg",
    "Golden Retriever": "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
    "German Shepherd Dog": "https://images.dog.ceo/breeds/germanshepherd/n02106662_14990.jpg",
    "Poodle": "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg",
    "Bulldog": "https://images.dog.ceo/breeds/bulldog-english/jager-1.jpg",
    "Rottweiler": "https://images.dog.ceo/breeds/rottweiler/n02106550_8224.jpg",
    "Beagle": "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg",
    "Dachshund": "https://images.dog.ceo/breeds/dachshund/Dash_the_Dachshund.jpg",
    "German Shorthaired Pointer": "https://images.dog.ceo/breeds/pointer-germanlonghair/hans2.jpg",
    "Pembroke Welsh Corgi": "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_10475.jpg",
    "Australian Shepherd": "https://images.dog.ceo/breeds/australian-shepherd/forest.jpg",
    "Yorkshire Terrier": "https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_1581.jpg",
    "Boxer": "https://images.dog.ceo/breeds/boxer/n02108089_878.jpg",
    "Cavalier King Charles Spaniel": "https://images.dog.ceo/breeds/spaniel-cocker/n02102973_3064.jpg",
    "Doberman Pinscher": "https://images.dog.ceo/breeds/doberman/n02107142_7048.jpg",
    "Miniature Schnauzer": "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_1116.jpg",
    "Shih Tzu": "https://images.dog.ceo/breeds/shih-tzu/n02086240_5765.jpg",
    "Siberian Husky": "https://images.dog.ceo/breeds/husky/n02110185_10974.jpg",
    "Boston Terrier": "https://images.dog.ceo/breeds/terrier-boston/n02088466_4370.jpg",
    "Bernese Mountain Dog": "https://images.dog.ceo/breeds/mountain-bernese/n02107683_2060.jpg",
    "Pomeranian": "https://images.dog.ceo/breeds/pomeranian/n02112018_4499.jpg",
    "Havanese": "https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191116123933390_COVER.jpg",
    "Shetland Sheepdog": "https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_2933.jpg",
    "Brittany": "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_4466.jpg",
    "English Springer Spaniel": "https://images.dog.ceo/breeds/spaniel-springer/n02102040_4182.jpg",
    "Cocker Spaniel": "https://images.dog.ceo/breeds/spaniel-cocker/n02102973_1754.jpg",
    "Border Collie": "https://images.dog.ceo/breeds/collie-border/n02106166_1098.jpg",
    "Maltese": "https://images.dog.ceo/breeds/maltese/n02085936_4519.jpg",
    "Mastiff": "https://images.dog.ceo/breeds/mastiff/n02mastiff_1.jpg",
    "Weimaraner": "https://images.dog.ceo/breeds/weimaraner/n02092339_728.jpg",
    "Vizsla": "https://images.dog.ceo/breeds/vizsla/n02100583_3230.jpg",
    "Chihuahua": "https://images.dog.ceo/breeds/chihuahua/n02085620_4875.jpg",
    "Bichon Frise": "https://images.dog.ceo/breeds/bichon/eva.jpg",
    "Akita": "https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg",
    "Bloodhound": "https://images.dog.ceo/breeds/hound-blood/n02088466_7655.jpg",
    "Whippet": "https://images.dog.ceo/breeds/whippet/n02091134_12167.jpg",
    "Basset Hound": "https://images.dog.ceo/breeds/hound-basset/n02088238_9440.jpg",
    "Chow Chow": "https://images.dog.ceo/breeds/chow/n02112137_5816.jpg",
    "Dalmatian": "https://images.dog.ceo/breeds/dalmatian/cooper2.jpg",
    "Irish Setter": "https://images.dog.ceo/breeds/setter-irish/n02100877_3380.jpg",
    "St. Bernard": "https://images.dog.ceo/breeds/stbernard/n02109525_4936.jpg",
    "Pug": "https://images.dog.ceo/breeds/pug/n02110958_10073.jpg",
    "Samoyed": "https://images.dog.ceo/breeds/samoyed/n02111889_5765.jpg",
    "Newfoundland": "https://images.dog.ceo/breeds/newfoundland/n02111277_7453.jpg",
    "Great Dane": "https://images.dog.ceo/breeds/dane-great/n02109047_35480.jpg",
    "Afghan Hound": "https://images.dog.ceo/breeds/hound-afghan/n02088094_10264.jpg",
    "Collie": "https://images.dog.ceo/breeds/collie-border/n02106166_1063.jpg",
    "Greyhound": "https://images.dog.ceo/breeds/greyhound-italian/n02091032_4040.jpg",
    "Italian Greyhound": "https://images.dog.ceo/breeds/greyhound-italian/n02091032_9267.jpg",
    "Alaskan Malamute": "https://images.dog.ceo/breeds/malamute/n02110063_2838.jpg",
    "Airedale Terrier": "https://images.dog.ceo/breeds/terrier-airedale/n02096051_925.jpg",
    "Australian Cattle Dog": "https://images.dog.ceo/breeds/cattledog-australian/IMG_3423.jpg",
    "Basenji": "https://images.dog.ceo/breeds/basenji/n02110806_4304.jpg",
    "Belgian Malinois": "https://images.dog.ceo/breeds/malinois/n02105162_1087.jpg",
    "Border Terrier": "https://images.dog.ceo/breeds/terrier-border/n02093754_2135.jpg",
    "Cairn Terrier": "https://images.dog.ceo/breeds/terrier-cairn/n02096177_3605.jpg",
    "Cardigan Welsh Corgi": "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_11784.jpg",
    "Irish Wolfhound": "https://images.dog.ceo/breeds/wolfhound-irish/n02090721_4282.jpg",
    "Papillon": "https://images.dog.ceo/breeds/papillon/n02086910_5303.jpg",
    "Rhodesian Ridgeback": "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_3255.jpg",
    "Samoyede": "https://images.dog.ceo/breeds/samoyed/n02111889_4171.jpg",
    "Scottish Terrier": "https://images.dog.ceo/breeds/terrier-scottish/n02097298_7785.jpg",
    "West Highland White Terrier": "https://images.dog.ceo/breeds/terrier-westhighland/n02098286_1050.jpg",
    "Shiba Inu": "https://images.dog.ceo/breeds/shiba/shiba-7.jpg",
    "Miniature Pinscher": "https://images.dog.ceo/breeds/pinscher-miniature/n02107312_3523.jpg",
    "Cane Corso": "https://images.dog.ceo/breeds/mastiff/n02mastiff_2.jpg",
    "Bull Terrier": "https://images.dog.ceo/breeds/terrier-american/n02093991_717.jpg",
    "Shar Pei": "https://images.dog.ceo/breeds/chow/n02112137_4449.jpg",
  };

  if (breedImageMap[name]) {
    return breedImageMap[name];
  }

  // For unmapped breeds, use a deterministic placedog ID based on the name
  const hash = name.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
  return `https://placedog.net/600/400?id=${(hash % 80) + 1}`;
}

function parseNumber(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

// Raw AKC CSV data (embedded from CSV file)
const RAW_CSV = `Affenpinscher,Confident Famously Funny Fearless,148,22.86,29.21,3.18,4.54,12,15,Toy Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.6,Regular Exercise,0.8,Easy Training,1.0,Outgoing
Afghan Hound,Dignified Profoundly Loyal Aristocratic,113,63.5,68.58,22.68,27.22,12,15,Hound Group,0.8,Daily Brushing,0.2,Infrequent,0.8,Energetic,0.2,May be Stubborn,0.2,Aloof/Wary
Airedale Terrier,Friendly Clever Courageous,60,58.42,58.42,22.68,31.75,11,14,Terrier Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.6,Regular Exercise,1.0,Eager to Please,0.8,Friendly
Akita,Courageous Dignified Profoundly Loyal,47,60.96,71.12,31.75,58.97,10,13,Working Group,0.8,Daily Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,0.6,Alert/Responsive
Alaskan Malamute,Affectionate Loyal Playful,58,58.42,63.5,34.02,38.56,10,14,Working Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.8,Energetic,0.4,Independent,0.8,Friendly
American Bulldog,Loyal Self-Confident,50.8,63.5,27.22,45.36,10,12,Foundation Stock Service,0.2,Occasional Bath/Brush,0.6,Seasonal,0.8,Energetic,0.6,Agreeable,0.6,Alert/Responsive
American English Coonhound,Sweet Mellow Sociable,175,58.42,66.04,20.41,29.48,11,12,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.8,Energetic,0.6,Agreeable,0.6,Alert/Responsive
American Eskimo Dog,Playful Perky Smart,122,22.86,48.26,2.72,15.88,13,15,Non-Sporting Group,0.4,Weekly Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
American Foxhound,Independent Easy-Going Sweet-Tempered,186,53.34,63.5,27.22,31.75,11,13,Hound Group,0.2,Occasional Bath/Brush,0.6,Seasonal,0.8,Energetic,0.4,Independent,0.8,Friendly
American Hairless Terrier,Energetic Alert Curious,136,30.48,40.64,5.44,7.26,14,16,Terrier Group,0.2,Occasional Bath/Brush,0.0,Infrequent,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
American Staffordshire Terrier,Confident Smart Good-Natured,85,43.18,48.26,18.14,31.75,12,16,Terrier Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.6,Regular Exercise,0.6,Agreeable,0.6,Alert/Responsive
American Water Spaniel,Eager Happy Charming,166,38.1,45.72,11.34,20.41,10,14,Sporting Group,0.6,2-3 Times a Week Brushing,0.2,Infrequent,0.6,Regular Exercise,1.0,Eager to Please,0.8,Friendly
Anatolian Shepherd Dog,Loyal Independent Reserved,90,68.58,73.66,36.29,68.04,11,13,Working Group,0.4,Weekly Brushing,0.6,Seasonal,0.6,Regular Exercise,0.4,Independent,0.4,Reserved with Strangers
Australian Cattle Dog,Alert Curious Energetic,55,43.18,50.8,13.61,22.68,12,16,Herding Group,0.2,Occasional Bath/Brush,0.4,Occasional,1.0,Needs Lots of Activity,1.0,Eager to Please,0.6,Alert/Responsive
Australian Shepherd,Smart Work-Oriented Exuberant,13,45.72,58.42,18.14,31.75,12,15,Herding Group,0.4,Weekly Brushing,0.6,Seasonal,1.0,Needs Lots of Activity,1.0,Eager to Please,0.8,Friendly
Australian Terrier,Spirited Alert Courageous,148,25.4,25.4,5.44,6.35,11,15,Terrier Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Barbet,Joyful Companionable Versatile,119,52.07,65.41,17.24,28.35,12,14,Sporting Group,0.6,2-3 Times a Week Brushing,0.0,Infrequent,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Basenji,Independent Smart Poised,87,40.64,43.18,9.07,11.34,13,14,Hound Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.4,Independent,0.4,Reserved with Strangers
Basset Hound,Patient Low-Key Charming,39,30.48,38.1,18.14,29.48,12,13,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.4,Calm,0.4,Independent,0.8,Friendly
Beagle,Merry Friendly Curious,7,33.02,38.1,9.07,13.61,10,15,Hound Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,1.0,Outgoing
Bearded Collie,Smart Bouncy Charismatic,113,50.8,55.88,18.14,27.22,12,14,Herding Group,0.8,Daily Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,1.0,Outgoing
Bedlington Terrier,Loyal Charming Frolicky,148,38.1,43.18,7.71,10.43,11,16,Terrier Group,0.8,Daily Brushing,0.0,Infrequent,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
Belgian Malinois,Confident Smart Hardworking,37,55.88,66.04,18.14,36.29,14,16,Herding Group,0.2,Occasional Bath/Brush,0.4,Occasional,1.0,Needs Lots of Activity,1.0,Eager to Please,0.6,Alert/Responsive
Belgian Sheepdog,Bright Alert Vigilant,113,55.88,66.04,20.41,31.75,12,14,Herding Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Belgian Tervuren,Courageous Attentive Alert,113,55.88,66.04,18.14,31.75,12,14,Herding Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Bernese Mountain Dog,Good-Natured Calm Strong,22,58.42,68.58,36.29,54.43,7,10,Working Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.6,Regular Exercise,1.0,Eager to Please,1.0,Outgoing
Bichon Frise,Playful Curious Peppy,46,23.02,29.85,5.44,8.16,14,15,Non-Sporting Group,0.8,Daily Brushing,0.0,Infrequent,0.6,Regular Exercise,0.8,Easy Training,1.0,Outgoing
Black and Tan Coonhound,Easygoing Devoted,148,58.42,68.58,22.68,36.29,10,12,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.6,Regular Exercise,0.4,Independent,0.8,Friendly
Bloodhound,Friendly Inquisitive Determined,51,58.42,68.58,36.29,54.43,10,12,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.8,Energetic,0.4,Independent,0.8,Friendly
Border Collie,Affectionate Smart Energetic,35,46.99,55.88,14.06,20.41,12,15,Herding Group,0.4,Weekly Brushing,0.6,Seasonal,1.0,Needs Lots of Activity,1.0,Eager to Please,0.8,Friendly
Border Terrier,Affectionate Happy Plucky,96,33.02,40.64,5.44,7.26,12,15,Terrier Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Borzoi,Athletic Loyal Regally Dignified,113,68.58,74.93,27.22,47.63,9,14,Hound Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.6,Regular Exercise,0.4,Independent,0.4,Reserved with Strangers
Boston Terrier,Friendly Bright Amusing,21,38.1,43.18,4.54,11.34,11,13,Non-Sporting Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.8,Easy Training,1.0,Outgoing
Bouvier des Flandres,Rational Resolute Family-Friendly,83,58.42,68.58,29.48,43.09,10,12,Herding Group,0.8,Daily Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,0.6,Alert/Responsive
Boxer,Fun-Loving Bright Active,14,53.34,63.5,22.68,36.29,10,12,Working Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Boykin Spaniel,Friendly Eager Lovable,35,38.1,45.72,11.34,18.14,10,15,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Briard,Loyal Faithful Protective,113,55.88,68.58,22.68,38.56,12,14,Herding Group,0.8,Daily Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.6,Alert/Responsive
Brittany,Bright Upbeat Agile,26,45.72,52.07,13.61,20.41,12,14,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,1.0,Needs Lots of Activity,1.0,Eager to Please,1.0,Outgoing
Brussels Griffon,Bossy Alert Curious,113,17.78,25.4,3.63,5.44,12,15,Toy Group,0.6,2-3 Times a Week Brushing,0.2,Infrequent,0.6,Regular Exercise,0.8,Easy Training,1.0,Outgoing
Bull Terrier,Playful Mischievous Silly,61,45.72,55.88,20.41,36.29,12,13,Terrier Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.6,Agreeable,0.8,Friendly
Bullmastiff,Loyal Devoted Alert,51,63.5,68.58,45.36,59.87,7,9,Working Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.4,Calm,0.8,Easy Training,0.6,Alert/Responsive
Cairn Terrier,Alert Cheerful Busy,70,27.94,33.02,6.35,7.26,13,15,Terrier Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Cane Corso,Affectionate Loyal Protective,32,60.96,68.58,40.82,59.87,9,12,Working Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.6,Regular Exercise,0.8,Easy Training,0.4,Reserved with Strangers
Cardigan Welsh Corgi,Affectionate Devoted Intelligent,40,27.94,34.29,11.34,17.24,12,15,Herding Group,0.4,Weekly Brushing,0.6,Seasonal,0.6,Regular Exercise,1.0,Eager to Please,0.8,Friendly
Cavalier King Charles Spaniel,Affectionate Gentle Graceful,15,30.48,33.02,5.44,8.16,12,15,Toy Group,0.4,Weekly Brushing,0.4,Occasional,0.4,Calm,1.0,Eager to Please,1.0,Outgoing
Chihuahua,Charming Graceful Sassy,33,12.7,20.32,0.91,2.72,14,16,Toy Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.6,Regular Exercise,0.8,Easy Training,0.6,Alert/Responsive
Chinese Crested,Affectionate Sweet-Tempered Lively,79,27.94,33.02,2.27,5.44,13,15,Toy Group,0.2,Occasional Bath/Brush,0.0,Infrequent,0.4,Calm,0.8,Easy Training,0.8,Friendly
Chinese Shar-Pei,Loyal Calm Independent,64,45.72,50.8,18.14,29.48,8,12,Non-Sporting Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.4,Calm,0.4,Independent,0.4,Reserved with Strangers
Chow Chow,Dignified Serious-Minded Bright,75,43.18,50.8,20.41,31.75,8,12,Non-Sporting Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.4,Calm,0.4,Independent,0.4,Reserved with Strangers
Clumber Spaniel,Loyal Playful Gentle,96,43.18,50.8,25.4,38.56,10,12,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.4,Calm,0.8,Easy Training,0.8,Friendly
Cocker Spaniel,Gentle Smart Happy,29,33.02,38.1,9.98,14.06,10,14,Sporting Group,0.8,Daily Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Collie,Devoted Graceful Proud,39,55.88,66.04,22.68,36.29,12,14,Herding Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Dachshund,Friendly Curious Spunky,9,20.32,22.86,4.54,15.88,12,16,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
Dalmatian,Dignified Smart Outgoing,56,48.26,58.42,20.41,31.75,11,13,Non-Sporting Group,0.2,Occasional Bath/Brush,0.6,Seasonal,0.8,Energetic,0.8,Easy Training,1.0,Outgoing
Doberman Pinscher,Loyal Fearless Alert,16,63.5,71.12,29.48,45.36,10,12,Working Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,0.6,Alert/Responsive
English Cocker Spaniel,Merry Loyal Athletic,52,38.1,43.18,11.34,15.88,12,14,Sporting Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
English Setter,Gentle Sociable Friendly,96,60.96,68.58,20.41,29.48,12,14,Sporting Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
English Springer Spaniel,Friendly Playful Obedient,27,45.72,50.8,18.14,25.4,12,14,Sporting Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Field Spaniel,Docile Sensitive Adaptable,148,43.18,45.72,15.88,25.4,11,13,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.6,Regular Exercise,1.0,Eager to Please,0.8,Friendly
Finnish Lapphund,Friendly Calm Courageous,113,43.18,50.8,15.88,23.59,12,15,Herding Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Finnish Spitz,Playful Alert Clever,119,40.64,50.8,7.26,14.06,13,15,Non-Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Flat-Coated Retriever,Cheerful Optimistic Good-Humored,96,56.52,62.23,25.4,34.93,8,10,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,1.0,Needs Lots of Activity,1.0,Eager to Please,1.0,Outgoing
French Bulldog,Adaptable Playful Smart,2,27.94,33.02,7.71,12.7,10,12,Non-Sporting Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.4,Calm,0.6,Agreeable,1.0,Outgoing
German Shepherd Dog,Confident Courageous Smart,3,55.88,63.5,22.68,40.82,7,10,Herding Group,0.4,Weekly Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,0.6,Alert/Responsive
German Shorthaired Pointer,Friendly Smart Willing,10,55.88,63.5,18.14,31.75,10,12,Sporting Group,0.2,Occasional Bath/Brush,0.2,Infrequent,1.0,Needs Lots of Activity,1.0,Eager to Please,0.8,Friendly
German Wirehaired Pointer,Affectionate Eager Enthusiastic,100,58.42,66.04,20.41,31.75,14,16,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,1.0,Needs Lots of Activity,1.0,Eager to Please,0.8,Friendly
Giant Schnauzer,Loyal Alert Trainable,79,58.42,68.58,25.4,43.09,12,15,Working Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,0.4,Reserved with Strangers
Glen of Imaal Terrier,Spirited Bold Brave,148,30.48,35.56,7.26,16.33,10,15,Terrier Group,0.4,Weekly Brushing,0.4,Occasional,0.6,Regular Exercise,0.4,Independent,0.6,Alert/Responsive
Golden Retriever,Friendly Reliable Trustworthy,4,53.34,61.0,25.4,36.29,10,12,Sporting Group,0.4,Weekly Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Gordon Setter,Alert Loyal Confident,113,60.96,68.58,20.41,29.48,12,13,Sporting Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Great Dane,Friendly Patient Dependable,20,71.12,81.28,49.9,82.55,7,10,Working Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
Great Pyrenees,Strong Devoted Patient,70,63.5,81.28,38.56,54.43,10,12,Working Group,0.4,Weekly Brushing,0.6,Seasonal,0.4,Calm,0.4,Independent,1.0,Outgoing
Greater Swiss Mountain Dog,Alert Loyal Devoted,75,58.42,71.12,36.29,60.78,8,11,Working Group,0.4,Weekly Brushing,0.6,Seasonal,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Greyhound,Independent Gentle Noble,148,68.58,76.2,27.22,31.75,10,13,Hound Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.6,Regular Exercise,0.6,Agreeable,0.4,Reserved with Strangers
Harrier,Friendly Outgoing Cheerful,148,48.26,53.34,18.14,27.22,12,15,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.8,Energetic,0.6,Agreeable,0.8,Friendly
Havanese,Intelligent Outgoing Friendly,24,22.86,29.21,3.17,5.9,14,16,Toy Group,0.8,Daily Brushing,0.0,Infrequent,0.6,Regular Exercise,0.8,Easy Training,1.0,Outgoing
Irish Setter,Rollicking Trainable Sweet-Natured,75,63.5,68.58,24.95,31.75,12,15,Sporting Group,0.4,Weekly Brushing,0.6,Seasonal,1.0,Needs Lots of Activity,1.0,Eager to Please,1.0,Outgoing
Irish Terrier,Courageous Loyal Lively,113,45.72,45.72,10.88,12.25,13,15,Terrier Group,0.6,2-3 Times a Week Brushing,0.2,Infrequent,0.8,Energetic,0.8,Easy Training,0.6,Alert/Responsive
Irish Water Spaniel,Playful Hardworking Brave,113,53.34,60.96,20.41,29.48,10,12,Sporting Group,0.4,Weekly Brushing,0.0,Infrequent,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Irish Wolfhound,Courageous Dignified Calm,96,71.12,81.28,40.82,54.43,6,8,Hound Group,0.4,Weekly Brushing,0.4,Occasional,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
Italian Greyhound,Playful Alert Sensitive,73,33.02,38.1,3.63,4.99,14,15,Toy Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.4,Calm,0.8,Easy Training,0.6,Alert/Responsive
Jack Russell Terrier,Alert Lively Sturdy,148,25.4,38.1,6.35,8.16,13,16,Terrier Group,0.2,Occasional Bath/Brush,0.2,Infrequent,1.0,Needs Lots of Activity,0.6,Agreeable,0.8,Friendly
Japanese Chin,Charming Noble Cat-Like,76,20.32,27.94,3.63,6.8,10,12,Toy Group,0.4,Weekly Brushing,0.2,Infrequent,0.4,Calm,0.8,Easy Training,0.8,Friendly
Keeshond,Friendly Lively Outgoing,92,43.18,48.26,15.88,20.41,12,15,Non-Sporting Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.6,Regular Exercise,1.0,Eager to Please,1.0,Outgoing
Kerry Blue Terrier,Alert Spirited Strong-Minded,96,45.72,50.8,15.0,18.14,13,15,Terrier Group,0.8,Daily Brushing,0.0,Infrequent,0.8,Energetic,0.6,Agreeable,0.8,Friendly
Labrador Retriever,Friendly Active Outgoing,1,53.34,63.5,25.4,36.29,10,12,Sporting Group,0.2,Occasional Bath/Brush,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Lagotto Romagnolo,Loyal Trainable Keen,113,41.91,48.26,11.34,17.24,15,17,Sporting Group,0.8,Daily Brushing,0.0,Infrequent,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Leonberger,Friendly Gentle Playful,119,65.41,79.25,36.29,68.04,7,9,Working Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Lhasa Apso,Confident Smart Comical,71,25.4,27.94,5.44,8.16,12,15,Non-Sporting Group,0.8,Daily Brushing,0.4,Occasional,0.4,Calm,0.4,Independent,0.6,Alert/Responsive
Lowchen,Affectionate Playful Intelligent,113,30.48,35.56,4.54,8.16,13,15,Non-Sporting Group,0.8,Daily Brushing,0.0,Infrequent,0.6,Regular Exercise,0.8,Easy Training,1.0,Outgoing
Maltese,Gentle Playful Charming,38,20.32,25.4,1.36,3.17,12,15,Toy Group,0.8,Daily Brushing,0.0,Infrequent,0.4,Calm,1.0,Eager to Please,1.0,Outgoing
Manchester Terrier,Spirited Observant Athletic,131,38.1,43.18,5.44,9.98,15,17,Terrier Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.8,Easy Training,0.6,Alert/Responsive
Mastiff,Courageous Dignified Good-Natured,32,68.58,91.44,54.43,90.72,6,10,Working Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.4,Calm,0.8,Easy Training,0.8,Friendly
Miniature American Shepherd,Good-Natured Intelligent Devoted,36,33.02,45.72,9.07,18.14,12,13,Herding Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Miniature Bull Terrier,Upbeat Mischievous Clown,113,25.4,35.56,9.98,15.88,11,13,Terrier Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.6,Agreeable,0.8,Friendly
Miniature Pinscher,Fearless Fun-Loving Proud,113,25.4,30.48,3.63,4.99,12,16,Toy Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.6,Agreeable,0.8,Friendly
Miniature Schnauzer,Friendly Smart Obedient,17,30.48,35.56,5.44,9.07,12,15,Terrier Group,0.6,2-3 Times a Week Brushing,0.0,Infrequent,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Newfoundland,Sweet Patient Devoted,35,66.04,71.12,45.36,68.04,9,10,Working Group,0.6,2-3 Times a Week Brushing,0.8,Regularly,0.4,Calm,0.8,Easy Training,1.0,Outgoing
Norfolk Terrier,Alert Fun-Loving Feisty,113,25.4,25.4,4.99,7.26,12,16,Terrier Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Norwegian Elkhound,Bold Energetic Playful,96,48.26,50.8,18.14,27.22,12,15,Hound Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.8,Energetic,0.8,Easy Training,0.6,Alert/Responsive
Norwich Terrier,Loving Curious Energetic,113,25.4,25.4,4.99,7.26,12,15,Terrier Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Nova Scotia Duck Tolling Retriever,Affectionate Outgoing Playful,87,44.45,53.34,17.24,23.59,12,14,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,1.0,Needs Lots of Activity,1.0,Eager to Please,0.8,Friendly
Old English Sheepdog,Adaptable Gentle Smart,55,55.88,61.0,27.22,45.36,10,12,Herding Group,0.8,Daily Brushing,0.6,Seasonal,0.6,Regular Exercise,1.0,Eager to Please,0.8,Friendly
Otterhound,Amiable Boisterous Even-Tempered,148,60.96,68.58,29.48,52.16,10,13,Hound Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.4,Independent,0.8,Friendly
Papillon,Friendly Alert Happy,52,20.32,27.94,3.63,4.54,14,16,Toy Group,0.4,Weekly Brushing,0.2,Infrequent,0.6,Regular Exercise,1.0,Eager to Please,1.0,Outgoing
Pekingese,Loyal Regal Opinionated,78,15.24,22.86,3.63,6.35,12,14,Toy Group,0.8,Daily Brushing,0.4,Occasional,0.2,Low Energy,0.4,Independent,0.6,Alert/Responsive
Pembroke Welsh Corgi,Affectionate Smart Alert,11,25.4,30.48,9.07,13.61,12,13,Herding Group,0.4,Weekly Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Plott Hound,Alert Loyal Intelligent,148,50.8,63.5,18.14,31.75,12,14,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.8,Energetic,0.6,Agreeable,0.8,Friendly
Pointer,Hardworking Alert Loyal,113,58.42,68.58,18.14,34.02,13,15,Sporting Group,0.2,Occasional Bath/Brush,0.2,Infrequent,1.0,Needs Lots of Activity,1.0,Eager to Please,0.8,Friendly
Pomeranian,Inquisitive Bold Lively,23,17.78,30.48,1.36,3.17,12,16,Toy Group,0.4,Weekly Brushing,0.2,Infrequent,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
Poodle (Miniature),Active Alert Trainable,8,25.4,38.1,5.44,9.07,10,18,Non-Sporting Group,0.8,Daily Brushing,0.0,Infrequent,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Poodle (Standard),Active Alert Trainable,6,38.1,76.2,18.14,31.75,10,18,Non-Sporting Group,0.8,Daily Brushing,0.0,Infrequent,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Poodle (Toy),Active Alert Trainable,5,25.4,25.4,1.81,4.54,10,18,Toy Group,0.8,Daily Brushing,0.0,Infrequent,0.6,Regular Exercise,1.0,Eager to Please,1.0,Outgoing
Portuguese Water Dog,Adventurous Intelligent Affectionate,52,43.18,57.15,15.88,27.22,11,13,Working Group,0.4,Weekly Brushing,0.0,Infrequent,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Pug,Charming Mischievous Loving,34,25.4,33.02,6.35,9.07,13,15,Toy Group,0.2,Occasional Bath/Brush,0.6,Seasonal,0.4,Calm,0.8,Easy Training,1.0,Outgoing
Rat Terrier,Lively Alert Curious,96,25.4,45.72,4.54,11.34,12,18,Terrier Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Redbone Coonhound,Loyal Attached Unabashedly Enthusiastic,143,53.34,68.58,20.41,36.29,12,15,Hound Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.8,Energetic,0.4,Independent,0.8,Friendly
Rhodesian Ridgeback,Affectionate Dignified Even-Tempered,43,60.96,68.58,29.48,38.56,10,12,Hound Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.6,Agreeable,0.4,Reserved with Strangers
Rottweiler,Loyal Loving Confident,8,55.88,68.58,36.29,61.24,9,10,Working Group,0.2,Occasional Bath/Brush,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,0.6,Alert/Responsive
Saint Bernard,Playful Charming Inquisitive,51,68.58,91.44,45.36,81.65,8,10,Working Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.4,Calm,0.6,Agreeable,0.8,Friendly
Saluki,Loyal Aloof Reserved,148,58.42,71.12,13.61,29.48,12,14,Hound Group,0.4,Weekly Brushing,0.2,Infrequent,0.8,Energetic,0.4,Independent,0.4,Reserved with Strangers
Samoyed,Adaptable Friendly Gentle,59,48.26,60.96,15.88,29.48,12,14,Working Group,0.6,2-3 Times a Week Brushing,0.6,Seasonal,0.8,Energetic,1.0,Eager to Please,1.0,Outgoing
Schipperke,Curious Energetic Devoted,113,25.4,33.02,3.63,9.07,13,15,Non-Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.6,Alert/Responsive
Scottish Deerhound,Docile Friendly Dignified,148,71.12,81.28,34.02,52.16,8,11,Hound Group,0.4,Weekly Brushing,0.4,Occasional,0.6,Regular Exercise,0.6,Agreeable,1.0,Outgoing
Scottish Terrier,Independent Faithful Playful,57,25.4,27.94,8.62,10.43,11,13,Terrier Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.6,Regular Exercise,0.4,Independent,0.4,Reserved with Strangers
Shetland Sheepdog,Playful Energetic Bright,25,33.02,40.64,6.35,12.7,12,14,Herding Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.6,Regular Exercise,1.0,Eager to Please,0.8,Friendly
Shih Tzu,Affectionate Playful Outgoing,20,22.86,27.94,4.08,7.26,10,18,Toy Group,0.8,Daily Brushing,0.2,Infrequent,0.4,Calm,0.8,Easy Training,1.0,Outgoing
Siberian Husky,Loyal Outgoing Mischievous,19,50.8,60.96,15.88,27.22,12,14,Working Group,0.4,Weekly Brushing,0.6,Seasonal,1.0,Needs Lots of Activity,0.4,Independent,1.0,Outgoing
Silky Terrier,Friendly Quickly Responsive Alert,113,22.86,25.4,3.63,4.54,13,15,Toy Group,0.4,Weekly Brushing,0.2,Infrequent,0.6,Regular Exercise,0.6,Agreeable,0.8,Friendly
Soft Coated Wheaten Terrier,Happy Devoted Energetic,52,43.18,50.8,13.61,20.41,12,14,Terrier Group,0.8,Daily Brushing,0.0,Infrequent,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Staffordshire Bull Terrier,Clever Brave Tenacious,79,35.56,40.64,11.34,17.24,12,14,Terrier Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.8,Energetic,0.6,Agreeable,0.8,Friendly
Standard Schnauzer,Loyal Alert Spirited,96,45.72,50.8,14.51,20.41,13,16,Working Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.6,Alert/Responsive
Sussex Spaniel,Friendly Cheerful Mellow,148,33.02,38.1,15.88,20.41,13,15,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.4,Calm,0.6,Agreeable,0.8,Friendly
Tibetan Mastiff,Independent Reserved Intelligent,148,63.5,71.12,40.82,81.65,10,12,Working Group,0.4,Weekly Brushing,0.4,Occasional,0.4,Calm,0.4,Independent,0.4,Reserved with Strangers
Tibetan Spaniel,Independent Self-Confident Alert,113,24.13,25.4,4.08,6.8,12,15,Non-Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.4,Calm,0.6,Agreeable,0.6,Alert/Responsive
Tibetan Terrier,Affectionate Devoted Sensitive,113,35.56,43.18,7.71,14.06,15,16,Non-Sporting Group,0.8,Daily Brushing,0.4,Occasional,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
Vizsla,Gentle Affectionate Energetic,30,53.34,63.5,18.14,31.75,12,14,Sporting Group,0.2,Occasional Bath/Brush,0.2,Infrequent,1.0,Needs Lots of Activity,1.0,Eager to Please,1.0,Outgoing
Weimaraner,Friendly Fearless Obedient,34,57.15,68.58,25.4,36.29,11,13,Sporting Group,0.2,Occasional Bath/Brush,0.2,Infrequent,1.0,Needs Lots of Activity,1.0,Eager to Please,1.0,Outgoing
Welsh Springer Spaniel,Friendly Playful Gentle,113,43.18,48.26,15.88,22.68,12,15,Sporting Group,0.4,Weekly Brushing,0.4,Occasional,0.8,Energetic,1.0,Eager to Please,0.8,Friendly
Welsh Terrier,Alert Spirited Friendly,113,38.1,38.1,9.07,10.88,12,15,Terrier Group,0.6,2-3 Times a Week Brushing,0.4,Occasional,0.8,Energetic,0.8,Easy Training,0.8,Friendly
West Highland White Terrier,Loyal Happy Entertaining,41,25.4,27.94,6.35,9.98,13,15,Terrier Group,0.6,2-3 Times a Week Brushing,0.2,Infrequent,0.8,Energetic,0.8,Easy Training,0.8,Friendly
Whippet,Amiable Gentle Graceful,36,45.72,55.88,6.8,14.06,12,15,Hound Group,0.2,Occasional Bath/Brush,0.2,Infrequent,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly
Wirehaired Pointing Griffon,Friendly Devoted Trainable,65,55.88,60.96,20.41,31.75,12,15,Sporting Group,0.4,Weekly Brushing,0.2,Infrequent,1.0,Needs Lots of Activity,1.0,Eager to Please,0.8,Friendly
Xoloitzcuintli,Loyal Alert Calm,69,25.4,57.15,3.63,20.41,13,18,Non-Sporting Group,0.2,Occasional Bath/Brush,0.0,Infrequent,0.4,Calm,0.8,Easy Training,0.4,Reserved with Strangers
Yorkshire Terrier,Feisty Tomboyish Affectionate,12,17.78,20.32,1.36,3.17,11,15,Toy Group,0.8,Daily Brushing,0.0,Infrequent,0.6,Regular Exercise,0.8,Easy Training,0.8,Friendly`;

function parseCSV(): Breed[] {
  const lines = RAW_CSV.trim().split("\n");
  return lines.map((line) => {
    // Use a simple split approach
    const parts = line.split(",");
    const name = parts[0];
    const temperament = parts[1];
    const popularity = parts[2] ? parseNumber(parts[2]) : null;
    const minHeight = parseNumber(parts[3]);
    const maxHeight = parseNumber(parts[4]);
    const minWeight = parseNumber(parts[5]);
    const maxWeight = parseNumber(parts[6]);
    const minExpectancy = parseNumber(parts[7]);
    const maxExpectancy = parseNumber(parts[8]);
    const group = parts[9] || "Mixed";
    const groomingFrequencyValue = parseNumber(parts[10]);
    const groomingFrequencyCategory = parts[11] || "";
    const sheddingValue = parseNumber(parts[12]);
    const sheddingCategory = parts[13] || "";
    const energyLevelValue = parseNumber(parts[14]);
    const energyLevelCategory = parts[15] || "";
    const trainabilityValue = parseNumber(parts[16]);
    const trainabilityCategory = parts[17] || "";
    const demeanorValue = parseNumber(parts[18]);
    const demeanorCategory = parts[19] || "";

    const avgWeight = (minWeight + maxWeight) / 2;
    const avgHeight = (minHeight + maxHeight) / 2;
    const sizeCategory = getSizeCategory(avgHeight, avgWeight);

    const isAllergyFriendly = sheddingValue <= 0.2;
    const isApartmentFriendly = energyLevelValue <= 0.6 && avgHeight < 50;
    const isGoodWithKids = demeanorValue >= 0.8 || demeanorCategory === "Outgoing" || demeanorCategory === "Friendly";
    const isGoodWithPets = demeanorCategory === "Outgoing" || demeanorCategory === "Friendly";

    return {
      name,
      description: "",
      temperament,
      popularity,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      minExpectancy,
      maxExpectancy,
      group,
      groomingFrequencyValue,
      groomingFrequencyCategory,
      sheddingValue,
      sheddingCategory,
      energyLevelValue,
      energyLevelCategory,
      trainabilityValue,
      trainabilityCategory,
      demeanorValue,
      demeanorCategory,
      sizeCategory,
      isAllergyFriendly,
      isApartmentFriendly,
      isGoodWithKids,
      isGoodWithPets,
      imageUrl: `https://placedog.net/600/400?id=${Math.abs(name.charCodeAt(0) * 3 + (name.charCodeAt(1) || 5) * 7)}`,
    };
  });
}

export const breeds: Breed[] = parseCSV();

export function getBreedById(id: string): Breed | undefined {
  return breeds.find((b) => b.name.toLowerCase().replace(/\s+/g, "-") === id);
}

export function getBreedUrl(breed: Breed): string {
  return `/breeds/${breed.name.toLowerCase().replace(/\s+/g, "-")}`;
}

// AKC breed image URLs using their public image CDN pattern
export function getBreedImageUrl(breedName: string): string {
  const akc: Record<string, string> = {
    "Labrador Retriever": "https://www.akc.org/wp-content/uploads/2017/11/Labrador-Retriever-On-White-01.jpg",
    "French Bulldog": "https://www.akc.org/wp-content/uploads/2017/11/French-Bulldog-On-White-001.jpg",
    "Golden Retriever": "https://www.akc.org/wp-content/uploads/2017/11/Golden-Retriever-FI.jpg",
    "German Shepherd Dog": "https://www.akc.org/wp-content/uploads/2017/11/German-Shepherd-Dog-Lg.jpg",
    "Poodle (Standard)": "https://www.akc.org/wp-content/uploads/2017/11/Poodle-On-White-Lg.jpg",
    "Beagle": "https://www.akc.org/wp-content/uploads/2017/11/Beagle-On-White-Lg.jpg",
    "Rottweiler": "https://www.akc.org/wp-content/uploads/2017/11/Rottweiler-On-White-Lg.jpg",
    "Dachshund": "https://www.akc.org/wp-content/uploads/2017/11/Dachshund-On-White-Lg.jpg",
    "Boxer": "https://www.akc.org/wp-content/uploads/2017/11/Boxer-On-White-Lg.jpg",
    "Siberian Husky": "https://www.akc.org/wp-content/uploads/2017/11/Siberian-Husky-On-White-Lg.jpg",
  };
  return akc[breedName] || `https://placedog.net/600/400?id=${Math.abs(breedName.charCodeAt(0) * 3 + (breedName.charCodeAt(1) || 5) * 7)}`;
}

export function energyLabel(val: number): string {
  if (val >= 1.0) return "Very High";
  if (val >= 0.8) return "High";
  if (val >= 0.6) return "Medium";
  if (val >= 0.4) return "Low-Medium";
  return "Low";
}

export function sheddingLabel(val: number): string {
  if (val >= 0.8) return "Heavy";
  if (val >= 0.6) return "Moderate-High";
  if (val >= 0.4) return "Moderate";
  if (val >= 0.2) return "Low";
  return "Minimal";
}

export function groomingLabel(val: number): string {
  if (val >= 0.8) return "High";
  if (val >= 0.6) return "Moderate-High";
  if (val >= 0.4) return "Moderate";
  return "Low";
}
