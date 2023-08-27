def create_url(list, index):
    base_url = 'https://pinterest.com/fashion.html'.format(list[index])
    return base_url

def get_url(base_url):
    print("now downlaoding {}".format(base_url))
    res = requests.get(base_url)
    res.raise_for_status()
    soup = bs4.BeautifulSoup(res.text, "html.parser")
    href_elm = soup.select("[class='catalog-link']")
    return href_elm

def parse_href(href_elm):
    if href_elm == []:
        print("There's nothing to see!")
    else:
        for elm in href_elm:
            sub_url_elm = elm.get('href')
            sub_url = "https://zozo.jp{}".format(sub_url_elm)
            res = requests.get(sub_url)
            res.raise_for_status()
            soup = bs4.BeautifulSoup(res.text, "html.parser")
            print("now downlaoding {}".format(sub_url))

            script_elm = soup.find_all('script')
            
            script_info = str(script_elm[1]).split(";")
            item_info = re.sub('[\r\n\t\t\t]+$', '', script_info[3])
            item_elm = item_info.split(",\r\n\t\t\t")
            item_list = []
            for x in item_elm:
                x = x.lstrip("\r\n\t\t\t")
                item_list.append(x)

            contents = make_contents(item_list)
            output(contents, f)
            time.sleep(1.0)

def make_contents(item_list):
    contents = []
    for x in item_list:
        if "goodsName" in x:
            x = x.replace("goodsName: ", "")
            contents.append(x)
        elif "color" in x:
            x = x.strip("\r\n\t\t}\r\n\t\tvar shopCommonConf = {\r\n\t\t\twebPathAnalyze: 'https://az.zozo.jp/'")
            x = x.replace("color: ", "")
            contents.append(x)
        elif "tbpath" in x:
            x = x.replace("tbpath: ", "")
            contents.append(x)
        elif "price" in x:
            x = x.replace("price: ", "")
            x = x.replace(",", "")
            contents.append(x)
        elif "TypeCategoryPath" in x:
            x = x.replace("TypeCategoryPath: ", "")
            contents.append(x)
        elif "GoodsTypePath" in x:
            x = x.replace("GoodsTypePath: ", "")
            contents.append(x)
        elif "DefaultImagePath" in x:
            x = x.replace("DefaultImagePath: ", "")
            contents.append(x)
    return contents

def output(contents, f):
    f.write(",".join(contents))
    f.write("\n")

def do_func(list, index):
    base_url = create_url(list, index)
    href_elm = get_url(base_url)
    item_list = parse_href(href_elm)

import os
import random
import string
import time
import requests
import urllib
import urllib.request
import urllib.parse
from urllib.parse import urlparse
import bs4
from bs4 import BeautifulSoup
import cchardet
import re

list = ['tops', 'pants', 'jacket-outerwear']
index = 0
while index < len(list):
    f = open('./clothes/men_{}.txt'.format(list[index]), "w", encoding = "utf_8")
    do_func(list, index)
    print("Next category")
    index += 1
