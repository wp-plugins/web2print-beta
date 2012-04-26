<div class="order-number"><span>{internalOrderNumber}</span></div>
<div class="order-element-title">
	<div class="order-position"><span>{transPos}</span></div>
	<div class="order-description"><span>{transDetailsandDescription}</span></div>
	<div class="order-amount"><span>{transAmount}</span></div>
	<div class="order-price"><span>{transPrice}</span></div>
	<div class="order-action" style="display: none"><span>{transAction}</span></div>
</div>
<div class="order-element-content">
	<div class="order-position-content">
		<div class="order-position-image {articleThumes}" id="order-position-image-{number}" {articlethums}>
		    {articlePic}
		    <div class="img-mask-confirm" style="display:none"><img class="{articleThumbs_confirm}" src="{articlePicturemash_confirm}"/></div>
		</div>
		
	</div>
	<div class="order-description-content">
		<div>{articleNameDescription}<br/>{articleDescription}<br/>{transProduction}: {articlePriceType}</div>
	</div>
	<div class="order-amount-content">{articleAmount} x {articleRun}</div>
	<div class="order-price-content">{articlePriceShow}</div>
	<div class="order-action-content">
		<!-- div class="order-action-button is-bottons"><span>{transShow}</span></div-->
	</div>
</div>