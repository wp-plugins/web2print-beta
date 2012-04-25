<li class="article-picture-li">
	<div class="article-picture-border {articlePictureBorder}">
		<img class="img_background" src="{img_background}" />
		<div class="articleThumbwrapper articleThumbwrapper_{have_mask}" style="{mask_style}">
			<img style="{img_style}" class="{articlePictureFormat} img_cut" src="{articlePictureThumb}" alt=""/>
		</div>
		<img style="{mask_style}" class="img_mask" src="{articlePicturemask}" alt=""/>
		<input class="thumb_hidden" type="hidden" value="{articlePictureThumb}"/>
		<input class="url_hidden" type="hidden" value="{articlePictureUri}"/>
		<input class="article_id" type="hidden" value="{articleId}"/>
		<input class="handle_hidden" type="hidden" value="{articlePictureHandle}"/>
		<input class="image_hidden" type="hidden" value="{articlePictureFileName}"/>
		<input class="width_hidden" type="hidden" value="{articlePictureImageWidth}"/>
		<input class="height_hidden" type="hidden" value="{articlePictureImageHeight}"/>
		<input type="hidden" class="picture-order" value="{pictureOrder}" />
		<input type="hidden" class="have-mask" value="{have_mask}" />
	</div>
	<div class="img_div_tools">
		<div class="shop_img_delete" onclick="{articlePictureDeleteFunc}"></div>
		<div class="shop_img_edit" onclick="{articlePictureEditFunc}"></div>
	</div>
</li>