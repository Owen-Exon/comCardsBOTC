from PIL import Image
import PIL.ImageOps    

import glob
import os

files = glob.glob("./Icons/*.png")

# for file in files:
#     fileName = os.path.basename(file)
#     name = fileName.replace("Icon_","")

#     img = Image.open(file).convert('LA')
#     img.save(f'./grayIcons/{name}')

for file in files:
    fileName = os.path.basename(file)
    name = fileName.replace("Icon_","")

    image = Image.open(file)
    
    r,g,b,a = image.split()
    rgb_image = Image.merge('RGB', (r,g,b))

    inverted_image = PIL.ImageOps.invert(rgb_image)

    r2,g2,b2 = inverted_image.split()

    final_transparent_image = Image.merge('RGBA', (r2,g2,b2,a))

    final_transparent_image = final_transparent_image.convert("LA")
    
    final_transparent_image.save(f'./grayIcons/{name}')