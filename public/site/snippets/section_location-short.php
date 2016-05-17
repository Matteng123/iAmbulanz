<div class="Location-teaser">
	<div class="Location-teaser-body">
		<div class="Location-teaser-text">
				<h2><?php echo $section->headline()->html() ?></h2>
				<?php echo $section->copy()->kirbytext() ?>
				<?php if($section->button_text()->exsits()): ?>
					<a class="Button" href="<?php echo html($section->button_url()) ?>"><span><?php echo html($section->button_text()) ?></span></a>
				<?php endif; ?>
		</div>
		<div class="Location-teaser-tab">
			<?php
			$locations = $site->standorte()->toStructure();
			$first = false;
			if($locations and $locations->count()): ?>
				<?php foreach($locations as $l): ?>
					<div class="Location-teaser-tab-item<?php if(!$first): ?> active<?php $first=true; endif; ?>">
						<div class="Location-teaser-tab-bar">
							<?php echo html($l->title()) ?>
						</div>
						<div class="Location-teaser-tab-body">
							<div>
								<p><strong>Adresse:</strong><br>
									<a href="http://maps.google.com/?q=<?php echo $l->street().', '.$l->zip().' '.$l->city() ?>" target="_blank">› <?php echo html($l->street()) ?><br/>
									<?php echo html($l->zip()) ?>&nbsp;<?php echo html($l->city()) ?></a>
								</p>
							</div>
							<div>
								<p><strong>Öffnungszeiten:</strong></p>
								<table>
									<tr>
										<td>Mo. - Fr.:&nbsp;&nbsp;</td>
										<td><?php echo $l->timesweek(); ?></td>
									</tr>
									<tr>
										<td>Sa.: </td>
										<td><?php echo $l->timesweeken(); ?></td>
									</tr>
								</table>
							</div>
							<div>
								<p><strong>Kontakt:</strong></p>
								<table>
									<tr>
										<td>Telefon:&nbsp;&nbsp;</td>
										<td><?php echo $l->tel(); ?></td>
									</tr>
									<tr>
										<td>Mobil:</td>
										<td><?php echo $l->mobil(); ?></td>
									</tr>
									<tr>
										<td>E-Mail:</td>
										<td><a href="mailto:<?php echo $l->email(); ?>">› <?php echo html($l->email()); ?></a></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				<?php endforeach ?>
			<?php endif ?>
		</div>
	</div>
</div>
