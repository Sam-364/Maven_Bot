"""gridbackendtrial URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from gridendpoints.views import get_prod_count, get_prod_by_id, get_prod_by_query, send_prompt, get_all_prod, sign_up, log_in

urlpatterns = [
    path('admin/', admin.site.urls),
    path('countProd/', get_prod_count),
    path('getProdById/', get_prod_by_id),
    path('searchProd/', get_prod_by_query),
    path('sendPrompt/', send_prompt),
    path('getAllProd/', get_all_prod),
    path("signUp/", sign_up),
    path("logIn/", log_in)
]
