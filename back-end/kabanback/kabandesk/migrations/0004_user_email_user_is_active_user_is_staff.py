# Generated by Django 5.0.3 on 2024-03-15 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kabandesk', '0003_alter_user_managers'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(db_index=True, default='', max_length=254, unique=True),
        ),
        migrations.AddField(
            model_name='user',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]