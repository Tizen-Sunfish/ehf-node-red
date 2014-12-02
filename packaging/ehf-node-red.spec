%define   _base ehf-node-red
## Basic Descriptions of this package
Name:       ehf-node-red
Summary:    Node.js Event IO engine for V8 JavaScript
Version:		0.11.14
Release:    1
Group:      System/Libraries
License:    Custom
Source0:    %{name}-%{version}.tar.gz

# Required packages
# Pkgconfig tool helps to find libraries that have already been installed
BuildRequires:  libattr-devel
BuildRequires:	python
BuildRequires:	which
BuildRequires:  pkgconfig(glib-2.0)
BuildRequires:  pkgconfig(node)

## Description string that this package's human users can understand
%description
Node.js port for Tizen 2.2

## Preprocess script
%prep

## Build script
%build

## Install script
%install
%setup -q
npm install

# install license file
mkdir -p %{buildroot}/usr/share/license
cp LICENSE %{buildroot}/usr/share/license/%{name}

## Postprocess script
%post 

## Binary Package: File list
%files
%manifest ehf-node-red.manifest
