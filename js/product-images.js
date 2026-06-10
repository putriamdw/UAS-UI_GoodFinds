const PRODUCT_IMAGES = {
  // Outerwear / Blazers
  'blazer_cream': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop',
  'blazer_beige': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
  'blazer_black': 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&h=1000&fit=crop',

  // Dresses
  'dress_floral': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
  'dress_cottagecore': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop',
  'dress_summer': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
  'dress_black': 'https://images.unsplash.com/photo-1562131526-d3e1fce7641b?w=800&h=1000&fit=crop',

  // Bags
  'bag_canvas': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
  'bag_shoulder': 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop',
  'bag_tote': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop',
  'bag_mini': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop',

  // Shoes
  'sneakers_white': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop',
  'sneakers_nike': 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=1000&fit=crop',
  'sneakers_retro': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=1000&fit=crop',
  'shoes_casual': 'https://images.unsplash.com/photo-1534482209744-29a59c1dd8c0?w=800&h=1000&fit=crop',

  // Tops / Shirts
  'shirt_flannel': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
  'shirt_oversized': 'https://images.unsplash.com/photo-1588117305388-c2631a279f8c?w=800&h=1000&fit=crop',
  'top_crop': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
  'top_knit': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop',
  'tshirt_basic': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',

  // Accessories
  'scarf_wool': 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=1000&fit=crop',
  'scarf_plaid': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
  'necklace_gold': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop',
  'accessories_set': 'https://images.unsplash.com/photo-1516953134398-acde7e2cde84?w=800&h=1000&fit=crop',

  // Jeans / Pants
  'jeans_straight': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
  'jeans_highwaist': 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=1000&fit=crop',
  'pants_cargo': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop',

  // Skirts
  'skirt_mini': 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop',
  'skirt_midi': 'https://images.unsplash.com/photo-1583496661169-2424d3666a8c?w=800&h=1000&fit=crop',

  // General fallback
  'default': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop'
};

// Get image URL by key
function getProductImage(key) {
  return PRODUCT_IMAGES[key] || PRODUCT_IMAGES.default;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCT_IMAGES, getProductImage };
}
