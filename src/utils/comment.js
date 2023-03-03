// 随机评论
// 花的名称
const flowerNames = [
  "玫瑰",
  "百合",
  "康乃馨",
  "牡丹",
  "梅花",
  "菊花",
  "桂花",
  "月季",
  "茉莉",
  "桃花",
  "杏花",
  "樱花",
  "海棠",
  "紫罗兰",
  "迎春花",
  "郁金香",
  "银杏",
  "秋海棠",
  "栀子花",
  "海蔚蓝",
  "桔梗",
  "芙蓉",
  "牵牛花",
  "雏菊",
  "鸢尾",
];

// 花的形容词
const adjectives = [
  "美丽的",
  "迷人的",
  "绚丽的",
  "多彩的",
  "优雅的",
  "优美的",
  "温馨的",
  "芬芳的",
  "香甜的",
  "甜美的",
  "柔美的",
  "娇媚的",
  "妩媚的",
  "清新的",
  "可爱的",
  "惊艳的",
  "耀眼的",
  "灿烂的",
  "瑰丽的",
  "玲珑的",
  "细致的",
  "秀丽的",
  "雅致的",
  "高贵的",
  "神秘的",
  "梦幻的",
  "浪漫的",
  "典雅的",
  "迎春的",
  "灵动的",
  "可人的",
  "艳丽的",
  "亮丽的",
  "艳冠群芳的",
  "花团锦簇的",
  "舒展的",
  "明亮的",
  "华丽的",
  "活泼的",
  "欢快的",
  "蓬松的",
];

// 花的评论内容
const flowerComments = [
  "这束花真的是太美了！",
  "每一朵花都像是一个小天使，让人心情愉悦。",
  "花的香气真是太好闻了。",
  "这么多鲜花，感觉自己置身于一个美丽的花园中。",
  "这束花色彩斑斓，真是让人惊叹不已。",
  "不知道该怎么形容这些美丽的花朵，真是太美了。",
  "真的是太浪漫了！送这样的花一定会让收到的人感动不已。",
  "我非常喜欢这些花，它们真的是太美了。",
  "这些花给人一种清新、舒适的感觉。",
  "这些花的形状都非常美丽，简直就是艺术品。",
  "这样的花束真的是太有品位了，每朵花都是精心挑选的。",
  "这些花色彩鲜艳、香气扑鼻，真是太美好了。",
  "每一朵花都是那么的娇嫩，就像是一位美丽的小姐姐。",
  "花开的那一刻，就好像整个世界都变得不一样了。",
  "这样的花束真的是太让人惊叹了，太美了。",
  "花的颜色都非常绚烂，就像是一幅绘画。",
  "这些花给人一种愉悦、快乐的感觉。",
  "花的芬芳让人身心愉悦，真是太美好了。",
  "这些花好像来自童话世界，让人感到非常的神奇。",
  "这样的花束真的是太有气质了，简直是完美的。",
  "这些花都是那么的精致、美丽，让人感到非常的喜欢。",
  "每一朵花都散发出独特的魅力，真是太美了。",
  "花的颜色和形状都非常漂亮，每一朵都是那么的完美。",
  "这样的花束真的是太有情调了，每一朵花都是那么的美丽。",
  "这些花的色彩非常鲜艳，让人感到非常愉悦。",
  "花的香气真的是太好闻了，就像是天堂中的味道。",
  "这束鲜花很漂亮，很喜欢！",
  "快递小哥送货速度很快，服务态度也很好！",
  "很喜欢这个品种的花，下次还会来买！",
  "花朵很鲜艳，很适合送给女朋友。",
  "好看的花，送给妈妈很开心。",
  "花瓶很漂亮，也很实用。",
  "这束鲜花真的很美，拍照也很好看！",
  "很新鲜的花，放在家里也很香。",
  "送货速度快，服务态度好。",
  "这是我第二次来买花了，很喜欢这里的花。",
  "价格实惠，花朵也很好看。",
  "这个品种的花非常好看，就是有点贵。",
  "很满意这次购物体验。",
  "这束鲜花送给女朋友，她非常喜欢。",
  "花的质量很好，没有坏的。",
  "收到的花和图片上的一样漂亮，非常满意。",
  "喜欢这里的服务，下次还会来买花。",
  "花瓶是特意选的，搭配得很好看。",
  "这次购买的花非常满意，很感谢。",
  "花朵很漂亮，价格也很实惠。",
  "快递小哥送货速度很快，很贴心。",
  "非常喜欢这里的花，下次还会来买。",
  "第一次在这里买花，购物体验很好。",
];

// 服务
const flowerServices = [
  "超快速配送",
  "优质的服务",
  "可靠的送货员",
  "高效的客服",
  "专业的园艺师",
  "周到的售后服务",
  "优惠的价格",
  "便捷的购物体验",
];

// 引入本地图片
const commentImgs = [];
commentImgs.push(require("@/assets/images/commentImg/3-1-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/3-1-2.jpg"));
commentImgs.push(require("@/assets/images/commentImg/4-1-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/6-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/7-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/8-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/10-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/11-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/11-2.jpg"));
commentImgs.push(require("@/assets/images/commentImg/12-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/12-2.jpg"));
commentImgs.push(require("@/assets/images/commentImg/14-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/15-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/16-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/23-4.jpg"));
commentImgs.push(require("@/assets/images/commentImg/24-3.jpg"));
commentImgs.push(require("@/assets/images/commentImg/34-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/35-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/36-1.jpg"));
commentImgs.push(require("@/assets/images/commentImg/37-2.jpg"));

// 打乱图片数组
const newArr = commentImgs.sort(() => Math.random() - 0.5);

// 生成随机评论并导出
export function generateComment() {
  // 从数组中随机选择元素
  const name = flowerNames[Math.floor(Math.random() * flowerNames.length)];
  const comment =
    flowerComments[Math.floor(Math.random() * flowerComments.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const services =
    flowerServices[Math.floor(Math.random() * flowerServices.length)];
  // 随机两位数
  const phoneNumFront = Math.floor(Math.random() * 90 + 10);
  // 随机四位数
  const phoneNumBehind = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  const generateComment = {
    phoneNumFront: phoneNumFront,
    phoneNumBehind: phoneNumBehind,
    comment: `${adjective}${name}！${comment}并且这里拥有${services}，体验真的很好！很推荐大家都来这里购物！`,
    commentImgs: newArr,
  };
  // 返回拼接好的评论字符串
  return generateComment;
}
