
<div class="Tool-header">
	<h1><?php echo $page->step4headline() ?></h1>
</div>
<div class="Tool-buttonlist">
		<ul>
		<?php foreach($damages as $damage): ?>
				<li><a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=5<?php echo getParamString($statusItems, 'damage', $damage['title']); ?>"><span><?php echo $damage['title']; ?></span></a></li>
		<?php endforeach; ?>
		</ul>
</div>
